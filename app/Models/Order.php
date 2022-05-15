<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'store_id' => 'integer',
        'payment_id' => 'integer',
        'payment_status' => 'integer',
        'status_order_id' => 'integer',
        'type_id' => 'integer',
        'user_owner_id' => 'integer',
    ];
}
