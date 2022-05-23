<?php

namespace App\Http\Controllers;

use App\Models\Foodsupply;
use App\Models\Qtyfood;
use Illuminate\Http\Request;

class FoodSPController extends Controller
{
    //
    public function getlist()
    {
        try {
            $user = Foodsupply::orderBy('id', 'DESC')->get();
            return response()->json([
                'status' => true,
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
        $item = Foodsupply::find($id);
        if (is_null($item)) {
            return response()->json([
                'status' => false,
                'message' => 'Not found',
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $item,
        ]);
    }

    public function store(Request $request)
    {
        $new = new Foodsupply;
        try {
            $new->id_store_get = $request->id_store_get;
            $new->id_store_share = $request->id_store_share;
            $new->notes = $request->notes;
            $new->status = $request->status;
            $new->orderD = $request->orderD ? json_encode($request->orderD) : json_encode([]);
            $result = $new->save();
            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Create new successfully!',
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
        $user = Foodsupply::findOrFail($request->input('id'));
        try {
            $user->update($request->all());
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
        $user = Foodsupply::findOrFail($id);
        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'Delete successfully!',
        ]);
    }

    public function update_accept(Request $request)
    {
        $itemOrder = Foodsupply::findOrFail($request->input('id'));
        // try {
            // update qty
            if (isset($request->orderD)) {
                if (isset($request->orderD)) {
                    foreach ($request->orderD as $item) {
                        $num = $item['qty'];
                        //store share
                        $itemS = Qtyfood::where(['id_food' => $item['id'], 'id_store' => $request['id_store_share']])->orderBy('id', 'DESC')->first();
                        $itemS['qty'] = $itemS['qty'] - $num;
                        if($itemS['qty'] < 0) {
                            return response()->json([
                                'status' => false,
                                'message' => 'Món ăn đã hết! Xin kiểm tra lại!',
                                'time'=>date('H:i:s'),
                            ]);
                        }
                        $itemS->update(['qty' => $itemS['qty']]);
                        //store get
                        $itemS = Qtyfood::where(['id_food' => $item['id'], 'id_store' => $request['id_store_get']])->orderBy('id', 'DESC')->first();
                        $itemS['qty'] = $itemS['qty'] + $num;
                        $itemS->update(['qty' => $itemS['qty']]);
                    }
                }
            }
            $request['orderD'] = $request->orderD ? json_encode($request->orderD) : json_encode([]);
            $itemOrder->update($request->all());
            return response()->json([
                'status' => true,
                'message' => 'Update successfully!',
            ]);
        // } catch (\Exception $err) {
        //     return response()->json([
        //         'status' => false,
        //         'message' => $err->getMessage()
        //     ]);
        // }
    }
}
