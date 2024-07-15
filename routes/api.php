<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::post('/api/search_person', [ApiController::class, 'searchPerson'])->name('api.search_person');
Route::post('/api/send', [ApiController::class, 'sendMessage'])->name('api.send_message');
Route::post('/api/convo', [ApiController::class, 'getMessages'])->name('api.convo');
Route::get('/api/convo/list', [ApiController::class, 'getConvoList'])->name('api.convo_list');
Route::post('/api/readLatest', [ApiController::class, 'readMessage'])->name('api.readMessage');