<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail; // <-- ajouter
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail // <-- ajouter ici
{
    use HasApiTokens, HasFactory, Notifiable;

    const ROLE_USER = 'USER';
    const ROLE_ADMIN = 'ADMIN';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
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
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // relation entre user et article
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
