<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Création d'un administrateur
        $admin = new User;
        $admin->name = 'admin';
        $admin->email = 'admin@mail.com';
        $admin->password = Hash::make('12345678');
        $admin->role = User::ADMIN_ROLE; // rôle ADMIN
        $admin->save();

        // Optionnel : création de quelques utilisateurs standard
        $user = new User;
        $user->name = 'user1';
        $user->email = 'user1@mail.com';
        $user->password = Hash::make('12345678');
        $user->role = User::USER_ROLE; // rôle USER
        $user->save();
    }
}
