<?php

use App\Http\Controllers\API\MemoController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// 認証が必要なルート
Route::middleware('auth:sanctum')->group(function () {
    // ユーザー情報取得
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // ログアウト
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // メモ関連のルート
    Route::apiResource('memos', MemoController::class);
});

// 認証が不要なルート
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);