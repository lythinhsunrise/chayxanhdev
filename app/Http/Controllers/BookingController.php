<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    //
    public function getlist(Request $request)
    {
        $store_id = $request->query('store_id');
        if($store_id == null || $store_id == 0){
            //All Booking
            $data = Booking::orderBy('id', 'DESC')->get();
        } else if ($store_id) {
            //Booking in store_id
            $data = Booking::where('store_id', $store_id)->orderBy('id', 'DESC')->get();
        }
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }
    //
    public function store(Request $request)
    {
        $new = new Booking;
        try {
            $new->date = $request->date;
            $new->guest = $request->guest;
            $new->name = $request->name;
            $new->phone = $request->phone;
            $new->store_id = $request->store_id;
            $new->time = $request->time;
            $new->status = 0;
            $result = $new->save();
            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Booking successfully!',
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
        $item = Booking::findOrFail($request->input('id'));
        try {
            $item->update($request->all());
            return response()->json([
                'status' => true,
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
        $user = Booking::findOrFail($id);
        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'Delete successfully!',
        ]);
    }
}
