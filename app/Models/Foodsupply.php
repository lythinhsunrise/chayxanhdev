<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foodsupply extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'id_store_get' => 'integer',
        'id_store_share' => 'integer',
        'status' => 'integer',
    ];
}
