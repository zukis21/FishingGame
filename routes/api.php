<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::prefix('game')->middleware('web')->group(function () {
    Route::get('start', [GameController::class, 'start']);
    Route::post('move', [GameController::class, 'move']);
    Route::get('state', [GameController::class, 'getState']);
    Route::post('advance', [GameController::class, 'advanceDay']);
});
