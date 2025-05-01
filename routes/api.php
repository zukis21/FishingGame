<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::prefix('game')->group(function () {
    Route::get('start', [GameController::class, 'start']);
    Route::post('move', [GameController::class, 'move']);
});
