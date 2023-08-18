<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Baby;
use App\Models\Mom;
use Carbon\Carbon;

class BabyController extends Controller
{
    public function index()
    {
        $babies = Baby::with('mom')->get();

        return response()->json($babies);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'mom_name' => 'required|exists:moms,name',
            'gender' => 'required|in:L,P',
            'birth_date' => 'required|date_format:d-m-Y',
            'pregnancy_age' => 'required|integer|min:0|max:10',
            'height' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
            'infant_condition' => 'required|in:Alive,Death,Disabled',
            'birth_process' => 'required|in:Normal,Caesar,Waterbirth,others',
        ]);

        $validatedData = $request->all();
        $mom = Mom::where('name', $validatedData['mom_name'])->first();
        $validatedData['mom_id'] = $mom->id; // Get mom_id from mom_name
        unset($validatedData['mom_name']); // Remove mom_name from the data
        $validatedData['birth_date'] = Carbon::createFromFormat('d-m-Y', $validatedData['birth_date'])->format('Y-m-d');

        $baby = Baby::create($validatedData);

        return response()->json($baby, 201);
    }

    public function show($id)
    {
        $baby = Baby::with('mom')->find($id);

        if (!$baby) {
            return response()->json(['message' => 'Baby not found'], 404);
        }

        return response()->json($baby);
    }

    public function update(Request $request, $id)
    {
        $baby = Baby::find($id);

        if (!$baby) {
            return response()->json(['message' => 'Baby not found'], 404);
        }

        $this->validate($request, [
            'mom_name' => 'required|exists:moms,name',
            'gender' => 'required|in:L,P',
            'birth_date' => 'required|date_format:d-m-Y',
            'pregnancy_age' => 'required|integer|min:0|max:10',
            'height' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
            'infant_condition' => 'required|in:Alive,Death,Disabled',
            'birth_process' => 'required|in:Normal,Caesar,Waterbirth,others',
        ]);

        $validatedData = $request->all();
        $mom = Mom::where('name', $validatedData['mom_name'])->first();
        $validatedData['mom_id'] = $mom->id; // Get mom_id from mom_name
        unset($validatedData['mom_name']); // Remove mom_name from the data
        if (isset($validatedData['birth_date'])) {
            $validatedData['birth_date'] = Carbon::createFromFormat('d-m-Y', $validatedData['birth_date'])->format('Y-m-d');
        }

        $baby->update($validatedData);

        return response()->json($baby);
    }

    public function destroy($id)
    {
        $baby = Baby::find($id);

        if (!$baby) {
            return response()->json(['message' => 'Baby not found'], 404);
        }

        $baby->delete();

        return response()->json(['message' => 'Baby deleted'], 200);
    }


    public function getAnalysisData(Request $request)
{
    $analysisData = [];

    $year = $request->input('year', Carbon::now()->year);
    $month = $request->input('month', Carbon::now()->month);

    $babies = Baby::whereYear('birth_date', $year)
        ->whereMonth('birth_date', $month)
        ->selectRaw('YEAR(birth_date) as year, MONTH(birth_date) as month, gender, 
            SUM(CASE WHEN gender = "L" THEN 1 ELSE 0 END) as male_count, 
            SUM(CASE WHEN gender = "P" THEN 1 ELSE 0 END) as female_count, 
            COUNT(*) as total_count, 
            AVG(CASE WHEN gender = "L" THEN weight ELSE 0 END) as avg_weight_male, 
            AVG(CASE WHEN gender = "P" THEN weight ELSE 0 END) as avg_weight_female')
        ->groupBy('year', 'month', 'gender')
        ->orderBy('year', 'asc')
        ->orderBy('month', 'asc')
        ->orderBy('gender', 'desc')
        ->get();

    foreach ($babies as $baby) {
        $analysisData[] = [
            'year' => $baby->year,
            'month' => $baby->month,
            'gender' => $baby->gender,
            'male_count' => $baby->male_count,
            'female_count' => $baby->female_count,
            'total_count' => $baby->total_count,
            'avg_weight_male' => $baby->avg_weight_male,
            'avg_weight_female' => $baby->avg_weight_female,
        ];
    }

    return response()->json($analysisData);
}

}
