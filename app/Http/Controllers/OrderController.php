<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Qtyfood;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function getlist(Request $request)
    {
        $store_id = request()->user()->store_id;
        $type_id = $request->query('type_id');
        if ($store_id && ($type_id == '0' || $type_id == '1')) {
            $data = Order::where(['type_id' => $type_id, 'store_id' => $store_id])->orderBy('id', 'DESC')->get();
            return response()->json([
                'status' => true,
                'data' => $data,
            ]);
        }
        if ($type_id == null) {
            //All orders
            $data = Order::orderBy('id', 'DESC')->get();
        } else if ($type_id == '0') {
            //Orders in store
            $data = Order::where('type_id', '0')->orderBy('id', 'DESC')->get();
        } else if ($type_id == '1') {
            //Orders home
            $data = Order::where('type_id', '1')->orderBy('id', 'DESC')->get();
        }
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
            //Them mon qty
            if (isset($request->orderD)) {
                foreach ($request->orderD as $item) {
                    $num = $item['qty'];
                    $item = Qtyfood::where(['id_food' => $item['id'], 'id_store' => $request['store_id']])->orderBy('id', 'DESC')->first();
                    $item['qty'] = $item['qty'] - $num;
                    $item->update(['qty' => $item['qty']]);
                }
            }
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
        $itemOrder = Order::findOrFail($request->input('id'));
        try {
            // update qty
            if (isset($request->orderD)) {
                $request['order_detail'] = $request->orderD ? json_encode($request->orderD) : json_encode([]);
                foreach ($request->orderD as $item) {
                    if (isset($item['oldQty'])) {
                        if ($item['oldQty'] != $item['qty']) {
                            //Tra mon
                            if ($item['oldQty'] > $item['qty']) {
                                $num = $item['oldQty'] - $item['qty'];
                                $item = Qtyfood::where(['id_food' => $item['id'], 'id_store' => $request['store_id']])->orderBy('id', 'DESC')->first();
                                $item['qty'] = $item['qty'] + $num;
                                $item->update(['qty' => $item['qty']]);
                            }
                            //Goi them mon
                            else if ($item['oldQty'] < $item['qty']) {
                                $num = $item['qty'] - $item['oldQty'];
                                $item = Qtyfood::where(['id_food' => $item['id'], 'id_store' => $request['store_id']])->orderBy('id', 'DESC')->first();
                                $item['qty'] = $item['qty'] - $num;
                                $item->update(['qty' => $item['qty']]);
                            }
                        }
                    } else {
                        //Them mon
                        $num = $item['qty'];
                        $item = Qtyfood::where(['id_food' => $item['id'], 'id_store' => $request['store_id']])->orderBy('id', 'DESC')->first();
                        $item['qty'] = $item['qty'] - $num;
                        $item->update(['qty' => $item['qty']]);
                    }
                }
            }
            // dd($request->orderD);
            unset($request['orderD']);
            $itemOrder->update($request->all());
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

    public function store_by_user(Request $request)
    {
        $order = Order::where('user_order_id', request()->user()->id)->orderBy('id', 'DESC')->get();
        // if (isset($order[0])) {
        //     if ($order[0]->status_order_id == 0) {
        //         return response()->json([
        //             'status' => false,
        //             'message' => "Xin hãy đợi đơn hàng trước được duyệt!"
        //         ]);
        //     }
        // }
        $new = new Order;
        $momo_id = time() . "";
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
            $new->momo_id = $momo_id;
            $result = $new->save();
            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Create new Order successfully!',
                    'data' => $new->id,
                    'tempOrderId' => $new->momo_id,
                ]);
            }
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => $err->getMessage()
            ]);
        }
    }

    public function update_accept_order(Request $request)
    {
        $itemOrder = Order::findOrFail($request->input('id'));
        try {
            // update qty
            if (isset($request->orderD)) {
                $request['order_detail'] = $request->orderD ? json_encode($request->orderD) : json_encode([]);
                //Them mon qty
                if (isset($request->orderD)) {
                    foreach ($request->orderD as $item) {
                        $num = $item['qty'];
                        $item = Qtyfood::where(['id_food' => $item['id'], 'id_store' => $request['store_id']])->orderBy('id', 'DESC')->first();
                        $item['qty'] = $item['qty'] - $num;
                        $item->update(['qty' => $item['qty']]);
                    }
                }
            }
            // dd($request->orderD);
            unset($request['orderD']);
            $itemOrder->update($request->all());
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

    public function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        //execute post
        $result = curl_exec($ch);
        //close connection
        curl_close($ch);
        return $result;
    }

    public function paymentWithMomo(Request $request)
    {
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";


        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $orderInfo = "Thanh toán qua MoMo";
        $amount = "10000";
        $orderId = time() . "";
        $extraData = "";

        // if (!empty($_POST)) {
        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $serectkey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        // $orderId = $request->orderId; // Mã đơn hàng
        $orderInfo = 'Thanh toán qua MoMo';
        $amount = $request->amount;
        $ipnUrl = 'http://dev-chayxanh.com/';
        $redirectUrl = 'http://dev-chayxanh.com/';
        $extraData = 'thinhdev test ne huhu';

        $requestId = time() . "";
        $requestType = "captureWallet";
        // $extraData = ($_POST["extraData"] ? $_POST["extraData"] : "");
        //before sign HMAC SHA256 signature
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $serectkey);
        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );
        $result = $this->execPostRequest($endpoint, json_encode($data));
        $jsonResult = json_decode($result, true);  // decode json
        // dd($jsonResult);
        if($jsonResult['payUrl']){
            return response()->json([
                'status' => true,
                'message' => 'Momo successfully!',
                'url' => $jsonResult['payUrl'],
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => 'Momo Order exist!',
        ]);
        //Just a example, please check more in there
        // can't use in ReatJS 
        // header('Location: ' . $jsonResult['payUrl']);
        // }
    }

    public function paymentMomoSuccess(Request $request){
        $order = Order::where('momo_id', $request->orderId)->first();
        $order->payment_status = 1;
        $order->status_order_id = 1;
        $order->update();
        return response()->json([
            'status' => true,
            'message' => 'Thanh toán thành công!',
        ]);
    }
}
