<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function getlist()
    {
        $data = Order::orderBy('id', 'DESC')->get();
        // $data = Order::where('type_id', '1')->orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }

    public function getitem($id)
    {
        $item = Order::find($id);
        if (is_null($item)) {
            return response()->json([
                'status' => false,
                'message' => 'Order not found',
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $item,
        ]);
    }

    public function store(Request $request)
    {
        $new = new Order;
        try {
            $new->type_id = $request->type_id;
            $new->user_order_id = $request->user_order_id ? $request->user_order_id : null;
            $new->phone = $request->phone ? $request->phone : null;
            $new->address = $request->address ? $request->address : null;
            $new->money = $request->money ? $request->money : null;
            $new->status_order_id = $request->status_order_id ? $request->status_order_id : 0;
            $new->order_detail = $request->orderD ? json_encode($request->orderD) : json_encode([]);
            $new->user_owner_id = $request->user_owner_id ? $request->user_owner_id : null;
            $new->store_id = $request->store_id ? $request->store_id : null;
            $new->name = $request->name ? $request->name : null;
            $new->payment_id = $request->payment_id ? $request->payment_id : 0;
            $new->payment_status = $request->payment_status ? $request->payment_status : 0;
            $new->notes = $request->notes ? $request->notes : null;
            $result = $new->save();
            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Create new Order successfully!',
                    'data' => $new->id
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
        $item = Order::findOrFail($request->input('id'));
        try {
            $request['order_detail'] = $request->orderD ? json_encode($request->orderD) : json_encode([]);
            unset($request['orderD']);
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
        $user = Order::findOrFail($id);
        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'Delete successfully!',
        ]);
    }

    public function order_by_user($user_id = null)
    {
        $data = Order::where('user_order_id', $user_id)->orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }
}
