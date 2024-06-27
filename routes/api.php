<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::post('/api/search_person', [ApiController::class, 'searchPerson'])->name('api.search_person');
Route::post('/api/send', [ApiController::class, 'sendMessage'])->name('api.send_message');