<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mom extends Model
{
    protected $fillable = [
        'name', 'age',
    ];

    public function babies()
    {
        return $this->hasMany(Baby::class);
    }
}
