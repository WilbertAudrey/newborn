<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mom;

class MomController extends Controller
{
    public function index()
    {
        $moms = Mom::with('babies')->get();

        return response()->json($moms);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:50',
            'age' => 'required|integer|min:2',
        ]);

        $data = $request->all();
        $mom = Mom::create($data);

        return response()->json($mom, 201);
    }

    public function show($id)
{
    $mom = Mom::find($id);

    if (!$mom) {
        return response()->json(['message' => 'Mom not found'], 404);
    }

    return response()->json($mom);
}

    public function update(Request $request, $id)
    {
        $mom = Mom::find($id);

        if (!$mom) {
            return response()->json(['message' => 'Mom not found'], 404);
        }

        $this->validate($request, [
            'name' => 'required|string|max:50',
            'age' => 'required|integer|min:2',
        ]);

        $data = $request->all();
        $mom->update($data);

        return response()->json($mom);
    }

    public function destroy($id)
    {
        $mom = Mom::find($id);

        if (!$mom) {
            return response()->json(['message' => 'Mom not found'], 404);
        }

        $mom->delete();

        return response()->json(['message' => 'Mom deleted successfully'], 200);
    }
}

