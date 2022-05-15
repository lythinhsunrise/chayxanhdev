<?php

namespace App\Http\Controllers;

use App\Models\Qtyfood;
use Illuminate\Http\Request;

class QtyfoodController extends Controller
{
    //
    public function getlist(Request $request)
    {
        $store_id = $request->query('store_id');
        if($store_id == null){
            //All Qtyfood
            $data = Qtyfood::orderBy('id', 'DESC')->get();
        } else if ($store_id) {
            //Qtyfood in store_id
            $data = Qtyfood::where('id_store', $store_id)->orderBy('id', 'DESC')->get();
        }
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }

    public function store(Request $request)
    {
        $new = new Qtyfood;
        try {
            $new->id_store = $request->id_store;
            $new->id_food = $request->id_food;
            $new->qty = $request->qty;
            $result = $new->save();
            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Update qty successfully!',
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
        $item = Qtyfood::findOrFail($request->input('id'));
        try {
            $item->update($request->all());
            return response()->json([
                'status' => true,
                'message' => 'Update qty successfully!',
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => $err->getMessage()
            ]);
        }
    }
}
