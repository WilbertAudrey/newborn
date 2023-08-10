<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Baby;
use App\Http\Requests\BabyRequest;

class BabyController extends Controller
{
    public function index()
{
    $babies = Baby::all();

    return response()->json($babies);
}


    public function store(Request $request)
{
    $validatedData = $this->validate($request, [
        'mother_name' => 'required|string',
        'mother_age' => 'required|integer',
        'gender' => 'required|in:L,P',
        'birth_date' => 'required|date_format:d-m-Y',
        'pregnancy_age' => 'required|integer',
        'height' => 'required|numeric',
        'weight' => 'required|numeric',
        'description' => 'nullable|string',
    ]);

    // Ubah format tanggal ke Y-m-d
    $birthDate = \Carbon\Carbon::createFromFormat('d-m-Y', $validatedData['birth_date'])->format('Y-m-d');

    $baby = Baby::create([
        'mother_name' => $validatedData['mother_name'],
        'mother_age' => $validatedData['mother_age'],
        'gender' => $validatedData['gender'],
        'birth_date' => $birthDate,
        'pregnancy_age' => $validatedData['pregnancy_age'],
        'height' => $validatedData['height'],
        'weight' => $validatedData['weight'],
        'description' => $validatedData['description'],
    ]);

    return response()->json($baby, 201);
}


public function show($id)
{
    $baby = Baby::find($id);

    if (!$baby) {
        return response()->json(['message' => 'Baby not found'], 404);
    }

    return response()->json($baby->toArray() + ['created_at' => $baby->created_at->format('Y-m-d H:i:s')]);
}


public function update(Request $request, $id)
{
    $baby = Baby::find($id);

    if (!$baby) {
        return response()->json(['message' => 'Baby not found'], 404);
    }

    $validatedData = $this->validate($request, [
        'mother_name' => 'string',
        'mother_age' => 'integer',
        'gender' => 'in:L,P',
        'birth_date' => 'date_format:d-m-Y',
        'pregnancy_age' => 'integer',
        'height' => 'numeric',
        'weight' => 'numeric',
        'description' => 'nullable|string',
    ]);

    $birthDate = \Carbon\Carbon::createFromFormat('d-m-Y', $validatedData['birth_date'])->format('Y-m-d');

    $baby->update([
        'mother_name' => $validatedData['mother_name'],
        'mother_age' => $validatedData['mother_age'],
        'gender' => $validatedData['gender'],
        'birth_date' => $birthDate,
        'pregnancy_age' => $validatedData['pregnancy_age'],
        'height' => $validatedData['height'],
        'weight' => $validatedData['weight'],
        'description' => $validatedData['description'],
    ]);

    return response()->json($baby);
}



    public function destroy($id)
    {
        $baby = Baby::find($id);

        if (!$baby) {
            return response()->json(['message' => 'Baby not found'], 404);
        }

        $baby->delete();

        return response()->json(['message' => 'Baby deleted'], 204);
    }
}
