<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;

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