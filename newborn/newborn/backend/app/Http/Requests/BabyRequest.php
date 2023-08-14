<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;

class BabyRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'mother_name' => 'required|string',
            'mother_age' => 'required|integer',
            'gender' => 'required|in:L,P',
            'birth_date' => 'required|date_format:d-m-Y',
            'pregnancy_age' => 'required|integer',
            'height' => 'required|numeric',
            'weight' => 'required|numeric',
            'description' => 'nullable|string',
        ];
    }
}
