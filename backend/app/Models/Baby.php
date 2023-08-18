<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Baby extends Model
{
    protected $fillable = [
        'mom_id', 'gender', 'birth_date', 'pregnancy_age', 'height', 'weight', 'description',
        'infant_condition', 'birth_process',
    ];

    public function mom()
    {
        return $this->belongsTo(Mom::class);
    }
}

