<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('welcome');
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/chat/{id}', [HomeController::class, 'chat'])->name('chat');
    Route::get('/messages/{convo_id}', [HomeController::class, 'messages'])->name('messages');
    
    // Api Routes
    require __DIR__.'/api.php';
});

require __DIR__.'/auth.php';
