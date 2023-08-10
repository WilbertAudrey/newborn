<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Baby extends Model
{
    protected $fillable = [
        'mother_name', 'mother_age', 'gender', 'birth_date', 'pregnancy_age', 'height', 'weight', 'description',
    ];
}
