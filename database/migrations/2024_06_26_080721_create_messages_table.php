<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->integer("convo_id")->unsigned();
            $table->foreign("convo_id")->references("id")->on("convos")->onDelete("cascade");
            $table->integer("sender")->unsigned();
            $table->foreign("sender")->references("id")->on("users")->onDelete("cascade");
            $table->string("message");
            $table->boolean("read")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
