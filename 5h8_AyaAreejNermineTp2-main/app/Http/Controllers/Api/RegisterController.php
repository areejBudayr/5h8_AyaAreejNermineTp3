<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;   // 👈 important pour l’appel à Google
use App\Models\User;

class RegisterController extends BaseController
{
    /**
     * REGISTER : POST /api/register
     */
    public function register(Request $request)
    {
        // 1. Valider les champs + le captcha
        $validator = Validator::make($request->all(), [
            'name'                 => 'required|string|max:255',
            'email'                => 'required|email|unique:users,email',
            'password'             => 'required|string|min:6|confirmed',
            'g-recaptcha-response' => 'required|string',   // 👈 virgule, pas point-virgule
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), 422);
        }

        // 2. Vérification reCAPTCHA via Google API
        $response = Http::asForm()->post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'secret'   => env('RECAPTCHA_SECRET_KEY'),
                'response' => $request->input('g-recaptcha-response'),
                'remoteip' => $request->ip(),
            ]
        );

        $captcha = $response->json();

        if (!isset($captcha['success']) || $captcha['success'] !== true) {
            return $this->sendError(
                'Captcha invalide. Veuillez cocher "Je ne suis pas un robot".',
                422
            );
        }

        // 3. Créer l'utilisateur
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'USER', // rôle par défaut
        ]);

        // 4. Générer un token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse(
            [
                'user'  => $user,
                'token' => $token,
            ],
            'Utilisateur enregistré avec succès.'
        );
    }

    /**
     * LOGIN : POST /api/login
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->sendError('Identifiants invalides', 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse(
            [
                'user'  => $user,
                'token' => $token,
            ],
            'Connexion réussie.'
        );
    }
}
