<?php

namespace App\Http\Controllers;

use App\Models\Convo;
use App\Models\Message;
use App\Models\ConvoMember;
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
        $isMyConvo = ConvoMember::where('conversation_id', $convo)
            ->where('user_id', auth()->user()->id)
            ->first();

        if(!$message || !$convo || !$isMyConvo){
            $status = 400;
            $res_message = 'Invalid request';
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

    public function getMessages(Request $req){
        $status = 200;

        $convo = $req->input('convo_id');
        $isMyConvo = ConvoMember::where('conversation_id', $convo)
            ->where('user_id', auth()->user()->id)
            ->first();

        if(!$convo || !$isMyConvo){
            $status = 400;
            $messages = null;
            log_info($convo);
            log_info($isMyConvo);
        } else {
            $messages = Message::where('convo_id', $convo)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response($messages, $status);
    }

    public function getConvoList(){
        $status = 200;

        $convos = ConvoMember::where('user_id', auth()->user()->id)
            ->select('conversation_id')->distinct()
            ->get();

       $recepients = ConvoMember::whereIn('conversation_id', $convos->pluck('conversation_id'))
            ->where('user_id', '!=', auth()->user()->id)
            ->select('user_id', 'conversation_id')
            ->get();

        if($recepients->count() > 0){
            foreach($recepients as $recipient){
                $recipient->user_data = $recipient->getUser();
                $recipient->latest_message = $recipient->getLatestMessage();
            }
        }

        return response($recepients, $status);
    }
}
