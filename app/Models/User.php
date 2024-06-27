<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Devdojo\Auth\Models\User as AuthUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class User extends AuthUser
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isOauth() {
        $user = User::where('id', $this->id)->select('password')->first()->makeVisible('password');
        return $user->password === null;
    }

    public function OAuthAvatar() {
        if(!$this->isOauth()) {
            return null;
        }
        $user = User::where('id', $this->id)->join('social_provider_user', 'users.id', '=', 'social_provider_user.user_id')->first();
        return $user->avatar;
    }

    protected static function boot()
    {
        parent::boot();

        static::retrieved(function ($user) {
            // no pass = OAuth
            $pass = $user->makeVisible('password')->password;

            if(!$pass){
                $socProv = DB::table('social_provider_user')->where('user_id', $user->id)->first();
                
                if($socProv){
                    // If no Profile Picture
                    if(!$user->avatar){
                        $user->avatar = $socProv ? $socProv->avatar : "/images/Baldski.webp";
                    }
                    $oath = json_decode($socProv->provider_data, true);
                    $oath_data = json_decode($oath, true);
                    $user->first_name = $oath_data['given_name'];
                    $user->last_name = $oath_data['family_name'];
                }
            } else if (!$user->avatar) {
                $user->avatar = "/images/Baldski.webp";
            }

            unset($user->two_factor_confirmed_at);
            unset($user->two_factor_recovery_codes);
            unset($user->two_factor_secret);
            unset($user->password);
        });
    }
}
