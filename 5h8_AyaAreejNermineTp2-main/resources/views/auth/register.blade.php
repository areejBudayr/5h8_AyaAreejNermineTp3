@extends('layouts.app')

@section('content')
<div class="login-container">
    <div class="login-card">
        <h2>Créer un compte</h2>

        <form method="POST" action="{{ route('register') }}">
            @csrf

            {{-- Nom --}}
            <label for="name">Nom complet</label>
            <input id="name" type="text" 
                   name="name" 
                   value="{{ old('name') }}" 
                   required autofocus
                   class="@error('name') is-invalid @enderror">
            @error('name')
                <span class="invalid-feedback">{{ $message }}</span>
            @enderror

            {{-- Email --}}
            <label for="email">Adresse e-mail</label>
            <input id="email" type="email" 
                   name="email" 
                   value="{{ old('email') }}" 
                   required
                   class="@error('email') is-invalid @enderror">
            @error('email')
                <span class="invalid-feedback">{{ $message }}</span>
            @enderror

            {{-- Mot de passe --}}
            <label for="password">Mot de passe</label>
            <input id="password" type="password" 
                   name="password" 
                   required
                   class="@error('password') is-invalid @enderror">
            @error('password')
                <span class="invalid-feedback">{{ $message }}</span>
            @enderror

            {{-- Confirmation --}}
            <label for="password-confirm">Confirmer le mot de passe</label>
            <input id="password-confirm" type="password" 
                   name="password_confirmation" required>

            {{-- Bouton --}}
            <button type="submit">S’inscrire</button>

            <a href="{{ route('login') }}">Déjà inscrit ? Se connecter</a>
        </form>
    </div>
</div>
@endsection
