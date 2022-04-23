<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    //
    public function getlist()
    {
        try {
            $user = User::all();
            return response()->json([
                'status' => true,
                'message' => 'Register successfully.',
                'data' => $user,
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => $err->getMessage()
            ]);
        }
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
}
