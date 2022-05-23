<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\FoodSPController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\QtyfoodController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Users
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
Route::post('/me/update', [AuthController::class, 'update'])->middleware(('auth:sanctum'));
Route::get('/users/getlist', [UsersController::class, 'getlist'])->middleware('auth:sanctum');
Route::get('/users/{id}', [UsersController::class, 'getitem'])->middleware('auth:sanctum');
Route::post('/users', [UsersController::class, 'store'])->middleware('auth:sanctum');
Route::post('/users/update', [UsersController::class, 'update'])->middleware('auth:sanctum');
Route::post('/users/delete/{id}', [UsersController::class, 'delete'])->middleware('auth:sanctum');
//Stores
Route::get('/stores/getlist', [StoreController::class, 'getlist']);
Route::get('/stores/{id}', [StoreController::class, 'getitem'])->middleware('auth:sanctum');
Route::post('/stores', [StoreController::class, 'store'])->middleware('auth:sanctum');
Route::post('/stores/update', [StoreController::class, 'update'])->middleware('auth:sanctum');
Route::post('/stores/delete/{id}', [StoreController::class, 'delete'])->middleware('auth:sanctum');
//Menus
Route::get('/menus/getlist', [MenuController::class, 'getlist']);
Route::get('/menus/{id}', [MenuController::class, 'getitem'])->middleware('auth:sanctum');
Route::post('/menus', [MenuController::class, 'store'])->middleware('auth:sanctum');
Route::post('/menus/update', [MenuController::class, 'update'])->middleware('auth:sanctum');
Route::post('/menus/delete/{id}', [MenuController::class, 'delete'])->middleware('auth:sanctum');
//Orders
Route::get('/orders/getlist', [OrderController::class, 'getlist'])->middleware('auth:sanctum');
Route::get('/orders/order_by_user/{id}', [OrderController::class, 'order_by_user'])->middleware('auth:sanctum');
Route::post('/store_by_user', [OrderController::class, 'store_by_user'])->middleware('auth:sanctum');
Route::get('/orders/{id}', [OrderController::class, 'getitem'])->middleware('auth:sanctum');
Route::post('/orders', [OrderController::class, 'store'])->middleware('auth:sanctum');
Route::post('/orders/update', [OrderController::class, 'update'])->middleware('auth:sanctum');
Route::post('/orders/update_accept_order', [OrderController::class, 'update_accept_order'])->middleware('auth:sanctum');
Route::post('/orders/delete/{id}', [OrderController::class, 'delete'])->middleware('auth:sanctum');
Route::post('/orders/update_by_user', [OrderController::class, 'update_by_user'])->middleware('auth:sanctum');
//QtyFoods
Route::get('/qtyfoods/getlist', [QtyfoodController::class, 'getlist'])->middleware('auth:sanctum');
Route::post('/qtyfoods', [QtyfoodController::class, 'store'])->middleware('auth:sanctum');
Route::post('/qtyfoods/update', [QtyfoodController::class, 'update'])->middleware('auth:sanctum');
//Booking
Route::get('/booking/getlist', [BookingController::class, 'getlist'])->middleware('auth:sanctum');
Route::post('/booking', [BookingController::class, 'store']);
Route::post('/booking/update', [BookingController::class, 'update'])->middleware('auth:sanctum');
Route::post('/booking/delete/{id}', [BookingController::class, 'delete'])->middleware('auth:sanctum');

//PaymentMomo
Route::post('/momo-payment', [OrderController::class, 'paymentWithMomo']);
Route::post('/momo-success', [OrderController::class, 'paymentMomoSuccess']);

//FoodSP
Route::get('/food_sp/getlist', [FoodSPController::class, 'getlist']);
Route::get('/food_sp/{id}', [FoodSPController::class, 'getitem'])->middleware('auth:sanctum');
Route::post('/food_sp', [FoodSPController::class, 'store'])->middleware('auth:sanctum');
Route::post('/food_sp/update', [FoodSPController::class, 'update'])->middleware('auth:sanctum');
Route::post('/food_sp/delete/{id}', [FoodSPController::class, 'delete'])->middleware('auth:sanctum');
Route::post('/food_sp/update_accept', [FoodSPController::class, 'update_accept'])->middleware('auth:sanctum');