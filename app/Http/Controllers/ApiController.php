<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ApiController extends Controller
{
    public function searchPerson(Request $req){
        $status = 200;
        $name = $req->input('search')['search'] ?? null;

        $type = $name == '' ? null : 'like';
        $where = $name == '' ? null : 'name';
        $name = $name == '' ? null : '%'.$name.'%';

        $users = User::where($where, $type, $name)
            ->select('id', 'name', 'avatar')
            ->orderBy('name', 'asc')
            ->limit(10)
            ->get();

        return response($users, $status);
    }
}
