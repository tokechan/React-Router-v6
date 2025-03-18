<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Memo;
use Illuminate\Http\Request;

class MemoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $memos = Memo::all();
        return response()->json($memos, 200, [
            'Content-Type' => 'application/json; charset=UTF-8'
        ])->setEncodingOptions(JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
            'status' => 'nullable',
            'creator' => 'required',
            'completed' => 'boolean|nullable',
        ]);

        $memo = Memo::create($request->all());
        
        return response()->json($memo, 201, [
            'Content-Type' => 'application/json; charset=UTF-8'
        ])->setEncodingOptions(JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $memo = Memo::findOrFail($id);
        return response()->json($memo, 200, [
            'Content-Type' => 'application/json; charset=UTF-8'
        ])->setEncodingOptions(JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'content' => 'nullable',
            'status' => 'nullable',
            'creator' => 'nullable',
            'completed' => 'boolean|nullable',
        ]);

        $memo = Memo::findOrFail($id);
        $memo->update($request->all());
        return response()->json($memo, 200, [
            'Content-Type' => 'application/json; charset=UTF-8'
        ])->setEncodingOptions(JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $memo = Memo::findOrFail($id);
        $memo->delete();
        return response()->json(null, 204, [
            'Content-Type' => 'application/json; charset=UTF-8'
        ])->setEncodingOptions(JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}