<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    //
    public function getlist()
    {
        // try {
        //     $user = User::all();
        //     return response()->json([
        //         'status' => true,
        //         'data' => $user,
        //     ]);
        // } catch (\Exception $err) {
        //     return response()->json([
        //         'status' => false,
        //         'message' => $err->getMessage()
        //     ]);
        // }
        $store_id = request()->user()->store_id;
        if($store_id == null){
            //All User
            $data = User::orderBy('id', 'DESC')->get();
        } else if ($store_id) {
            //User in store_id
            $data = User::where('store_id', $store_id)->orderBy('id', 'DESC')->get();
        }
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }

    public function getitem($id)
    {
        $user = User::find($id);
        if (is_null($user)) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $user = new User;
        try {
            $validatedData = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                // 'email' => 'required|string|email|max:255|unique:users',
                'username' => 'required|unique:users',
                'password' => 'required|string|min:8',
                'phone' => 'required|unique:users',
            ]);
            if ($validatedData->fails()) {
                return response()->json([
                    'status' => false,
                    'message'  => $validatedData->errors()->first()
                ]);
            }
            $user->name = $request->name;
            $user->username = $request->username;
            $user->password = Hash::make($request->password);
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->role_id = $request->role_id ? $request->role_id : null;
            $user->store_id = $request->store_id ? $request->store_id : null;
            $user->address = $request->address ? $request->address : null;
            $result = $user->save();
            $token = $user->createToken('auth_token')->plainTextToken;
            $user->access_token = $token;
            $user->update();
            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Create user successfully!',
                ]);
            }
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => $err->getMessage()
            ]);
        }
    }

    public function update(Request $request)
    {
        $user = User::findOrFail($request->input('id'));
        try {
            $validatedData = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                // 'email' => ['required',Rule::unique('users')->ignore($user->id)],
                'username' => ['required',Rule::unique('users')->ignore($user->id)],
                'phone' => ['required',Rule::unique('users')->ignore($user->id)],
            ]);
            if ($validatedData->fails()) {
                return response()->json([
                    'status' => false,
                    'message'  => $validatedData->errors()->first()
                ]);
            }
            if($request->input('password')){
                $request['password'] = Hash::make($request->input('password'));
            }
            $user->update($request->all());
            return response()->json([
                'status' => true,
                'data' => [
                    'user' => $user,
                ],
                'message' => 'Update successfully!',
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => $err->getMessage()
            ]);
        }
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'Delete successfully!',
        ]);
    }
}
