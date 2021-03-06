<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        try {
            $validatedData = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                // 'email' => 'required|string|email|max:255|unique:users',
                'username' => 'required|unique:users',
                'phone' => 'required|unique:users',
                'password' => 'required|string|min:8',
            ]);

            if ($validatedData->fails()) {
                return response()->json([
                    'status' => false,
                    'message'  => $validatedData->errors()->first()
                ]);
            }

            $user = User::create([
                'name' => $request['name'],
                'email' => isset($request['email']) ? $request['email'] : $request['email'],
                'username' => $request['username'],
                'phone' => $request['phone'],
                'password' => Hash::make($request['password']),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;
            $user['access_token'] = $token;
            $user->update();

            return response()->json([
                'status' => true,
                'message' => 'Register successfully.',
                'data' => [
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ]
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => $err->getMessage()
            ]);
        }
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('username','password'))) {
            if (!Auth::attempt(["phone" => $request['username'], "password" => $request['password']])){
                return response()->json([
                    'status' => false,
                    'message' => 'Wrong username/phone number or password.'
                ]);
            }
            $user = User::where('phone', $request['username'])->firstOrFail();
        }

        $user = isset($user) ? $user : User::where('username', $request['username'])->firstOrFail();

        // $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            // 'message' => 'Welcome back '.$user->name,
            'message' => "Login successfully",
            'data' => [
                'user' => $user,
            ]
            // 'access_token' => $token,
            // 'token_type' => 'Bearer',
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'status' => true,
            'message' => '',
            'data' => [
                'user' => $request->user(),
            ]
        ]);
    }

    public function update(Request $request)
    {
        $user = User::findOrFail($request->input('id'));
        if($request->input('password')){
            $request['password'] = Hash::make($request->input('password'));
        }
        $user->update($request->all());
        return response()->json([
            'status' => true,
            'data' => [
                'user' => $user,
            ],
            'message' => 'Update info successfully! Please login again!',
        ]);
    }
}
