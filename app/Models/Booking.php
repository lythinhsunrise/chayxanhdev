<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'guest' => 'integer',
        'status' => 'integer',
        'store_id' => 'integer',
    ];
}
