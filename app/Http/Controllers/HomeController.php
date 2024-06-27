<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
        $set = [
            'data' => 'Hello World!'
        ];
        return Inertia::render('Welcome', $set);
    }

    public function dashboard(){
        $res = axios('get', 'https://reqres.in/api/users');
        log_info($res, __METHOD__, __LINE__);
        return Inertia::render('Dashboard');
    }
}
