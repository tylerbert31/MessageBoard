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
        return Inertia::render('Dashboard');
    }
}
