<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Schema\Builder;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // デフォルトの文字コードをUTF-8に設定
        ini_set('default_charset', 'UTF-8');
        
        // データベースの文字コードをutf8mb4に設定
        Builder::defaultStringLength(191);
        
        // JSONエンコーディングオプションを設定
        \Config::set('app.json_encoding_options', JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
