<?php

namespace App\Http\Controllers;

use App\Models\Convo;
use App\Models\ConvoMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        if(!$receiver || $id == auth()->user()->id){
            return redirect()->route('dashboard');
        }

        $convo = $this->hasConvo($id);
        return redirect("/messages/{$convo}");
    }

    public function messages($convo_id){
        $convo = ConvoMember::where('conversation_id', $convo_id)
            ->where('user_id', auth()->user()->id)
            ->first();

        if(!$convo){
            return redirect()->route('dashboard');
        }

        $convo_data = [
            'id' => $convo_id,
        ];

        $convo_receiver = ConvoMember::where('conversation_id', $convo_id)
            ->where('user_id', '!=', auth()->user()->id)
            ->first();

        $receiver_data = User::find($convo_receiver->user_id);
        $convo_data['receiver'] = $receiver_data;

        $set = [
            'convo_id' => $convo_id,
            'convo' => $convo_data
        ];
        return Inertia::render('Dashboard', $set);
    }

    public function hasConvo($rec_id){
        $convo_id = null;
        $current_user = auth()->user()->id;
        $myconvos = DB::select("SELECT conversation_id FROM convo_members WHERE user_id = {$current_user}");
        $my_convo_ids = array_column($myconvos, 'conversation_id');

        $our_convo = ConvoMember::whereIn('conversation_id', $my_convo_ids)
            ->where('user_id', $rec_id)
            ->first();
        
        if(!$our_convo){
            $convo = Convo::create([
                'type' => 0
            ]);

            $new_convo_members = [
                ['conversation_id' => $convo->id, 'user_id' => $current_user],
                ['conversation_id' => $convo->id, 'user_id' => $rec_id]
            ];

            ConvoMember::insert($new_convo_members);
            $convo_id = $convo->id;
        } else {
            $convo_id = $our_convo->conversation_id;
        }
        return $convo_id;
    }
}
