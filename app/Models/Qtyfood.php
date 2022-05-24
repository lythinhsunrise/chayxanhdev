<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qtyfood extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'id_food' => 'integer',
        'id_store' => 'integer',
        'qty' => 'integer',
    ];
}
