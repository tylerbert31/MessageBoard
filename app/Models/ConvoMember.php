<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Message;

class ConvoMember extends Model
{
    use HasFactory;

    public function getUser(){
        return User::where('id', $this->user_id)->first();
    }

    public function getLatestMessage(){
        return Message::where('convo_id', $this->conversation_id)
            ->orderBy('created_at', 'desc')
            ->first();
    }
}
