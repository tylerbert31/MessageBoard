<?php

namespace App\Http\Controllers;

use App\Models\User;
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

    public function chat($id){
        $receiver = User::find($id);

        if(!$receiver){
            return redirect()->route('dashboard');
        }
        $set = [
            'id' => $id,
            'receiver' => $receiver
        ];
        return $set;
    }
}
