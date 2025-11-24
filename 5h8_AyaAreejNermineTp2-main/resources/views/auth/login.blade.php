@extends('layouts.app')

@section('content')
<div class="login-container">
    <div class="login-card">
        <h2>Connexion</h2>

        <form method="POST" action="{{ route('login') }}">
            @csrf

            {{-- Email --}}
            <label for="email">Adresse e-mail</label>
            <input id="email" type="email" 
                   class="@error('email') is-invalid @enderror" 
                   name="email" value="{{ old('email') }}" 
                   required autofocus>
            @error('email')
                <span class="invalid-feedback" role="alert">{{ $message }}</span>
            @enderror

            {{-- Mot de passe --}}
            <label for="password">Mot de passe</label>
            <input id="password" type="password" 
                   class="@error('password') is-invalid @enderror" 
                   name="password" required>
            @error('password')
                <span class="invalid-feedback" role="alert">{{ $message }}</span>
            @enderror

            {{-- Remember me --}}
            <div class="remember">
                <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                <label for="remember">Se souvenir de moi</label>
            </div>

            {{-- Bouton --}}
            <button type="submit">Se connecter</button>

            {{-- Lien mot de passe oublié --}}
            @if (Route::has('password.request'))
                <a href="{{ route('password.request') }}">Mot de passe oublié ?</a>
            @endif
        </form>
    </div>
</div>
@endsection
