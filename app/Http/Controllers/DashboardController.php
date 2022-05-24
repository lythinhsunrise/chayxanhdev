<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //
    public function revenue_store(Request $request)
    {
        $time_start = $request->time_start;
        $time_end = $request->time_end;
        $store_id = $request->store_id;
        // $data = DB::select("SELECT * FROM orders WHERE created_at>'2022-05-22' AND created_at<'2022-05-24' AND store_id=1 AND payment_status=1");
        // dd("SELECT * FROM orders WHERE created_at>'{$time_start}' AND created_at<'{$time_end}' AND payment_status=1");
        if ($store_id == 0) {
            $data = DB::select("SELECT * FROM orders WHERE created_at>'{$time_start}' AND created_at<'{$time_end}' AND payment_status=1");
        } else {
            $data = DB::select("SELECT * FROM orders WHERE created_at>'{$time_start}' AND created_at<'{$time_end}' AND store_id={$store_id} AND payment_status=1");
        }
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }
    public function revenue_by_day_store(Request $request)
    {
        $time_start = $request->time_start;
        $time_end = $request->time_end;
        $store_id = $request->store_id;
        // $data =DB::select("SELECT SUM(money),created_at FROM orders WHERE created_at>'2022-05-01' AND created_at<'2022-05-31' AND payment_status=1 GROUP BY DATE(created_at)");
        if ($store_id == 0) {
            $data = DB::select("SELECT SUM(money) AS money,created_at FROM orders WHERE created_at>'{$time_start}' AND created_at<'{$time_end}' AND payment_status=1 GROUP BY DATE(created_at) ORDER BY created_at");
        } else {
            $data = DB::select("SELECT SUM(money) AS money,created_at FROM orders WHERE created_at>'{$time_start}' AND created_at<'{$time_end}' AND store_id={$store_id} AND payment_status=1 GROUP BY DATE(created_at)");
        }
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }
}
