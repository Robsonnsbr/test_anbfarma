<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to API Frutaria v1. No web routes were developed — only the /api/v1 endpoints are available.',
    ]);
});
