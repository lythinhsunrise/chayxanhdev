<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('type_id');
            $table->integer('user_order_id')->nullable();
            $table->integer('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('money')->nullable();
            $table->integer('status_order_id')->nullable();
            $table->text('order_detail')->nullable();
            $table->integer('user_owner_id')->nullable();
            $table->integer('store_id')->nullable();
            $table->string('name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
