<?php

namespace App\Models;

use Carbon\Carbon;
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
        'momo_id' => 'integer',
    ];
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->timezone('Asia/Bangkok')->format('d-m-Y H:i:s');
    }
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->timezone('Asia/Bangkok')->format('Y-m-d H:i:s');
    }
}
