<?php

namespace App\Http\Controllers;

use App\Models\Message;
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
            ->where('id', '!=', auth()->user()->id)
            ->select('id', 'name', 'avatar')
            ->orderBy('name', 'asc')
            ->limit(10)
            ->get();

        return response($users, $status);
    }

    public function sendMessage(Request $req){
        $status = 200;
        $res_message = 'message sent';

        $req_data = $req->all();
        $message = $req_data['message'];
        $convo = $req_data['convo_id'];

        if(!$message || !$convo){
            $status = 400;
            $res_message = 'Invalid request';
            log_info('Invalid request');
        } else {
            $data = [
                'message' => $message,
                'sender' => auth()->user()->id,
                'convo_id' => $convo,
            ];
    
            try {
                Message::create($data);
                log_info('Message sent');
            } catch (\Throwable $th) {
                $status = 500;
                $res_message = 'An error occurred: '. json_encode($th->getMessage());
                log_info('An error occurred: '. json_encode($th->getMessage()));
            }
        }

        return response($res_message, $status);
    }
}
