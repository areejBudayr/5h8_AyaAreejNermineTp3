<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends BaseController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), 422);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => User::ROLE_USER,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse([
            'user'  => $user,
            'token' => $token,
        ], 'Utilisateur enregistré avec succès.');
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->sendError('Identifiants invalides', 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse([
            'user'  => $user,
            'token' => $token,
        ], 'Connexion réussie.');
    }
}
