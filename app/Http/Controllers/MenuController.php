<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    //
    public function getlist()
    {
        $data = Menu::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }

    public function getitem($id)
    {
        $item = Menu::find($id);
        if (is_null($item)) {
            return response()->json([
                'status' => false,
                'message' => 'Menu not found',
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $item,
        ]);
    }

    public function store(Request $request)
    {
        $new = new Menu;
        //Upload photo
        $file_url = '';
        if (request()->has('upload')) {
            $file_url = $this->upload($request['upload']);
        }
        try {
            $new->name = $request->name;
            $new->ingredients = $request->ingredients;
            $new->nutrition = $request->nutrition;
            $new->price = $request->price;
            $new->category = $request->category;
            $new->pic = $file_url;
            $result = $new->save();
            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Create new menu successfully!',
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
        $item = Menu::findOrFail($request->input('id'));
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
        $item = Menu::findOrFail($id);
        if($item->pic){
            if(file_exists(public_path().'/images'.$item->pic)){
                unlink(public_path().'/images'.$item->pic);
            };
        }
        $item->delete();
        return response()->json([
            'status' => true,
            'message' => 'Delete successfully!',
        ]);
    }

    public function upload($file, $existfile = '/none')
    {
        if ($existfile) {
            if (file_exists(public_path() . '/images' . $existfile)) {
                unlink(public_path() . '/images' . $existfile);
            };
        }
        $extension = $file->getClientOriginalExtension(); // you can also use file name
        $fileName = time() . '.' . $extension;
        $path = public_path() . '/images';
        $upload = $file->move($path, $fileName);
        if ($upload) {
            return '/' . $fileName;
        }
        return '';
    }
}
