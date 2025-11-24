<!doctype html>
<html lang="{{ app()->getLocale() }}" @if(app()->getLocale()==='ar') dir="rtl" class="rtl" @endif>
<head>
  <meta charset="utf-8">
  <title>@yield('title','Catalogue')</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  {{-- Feuille de style du thème boutique --}}
  <link rel="stylesheet" href="{{ asset('css/shop.css') }}">
</head>
<body>

  {{-- HEADER --}}
  <header class="site-header">
    <div class="container navbar">
      <a href="{{ url('/') }}" class="brand" aria-label="Accueil">
        <span class="logo"></span>
        <span class="title">{{ __('app.brand') }}</span>
      </a>

      <nav class="nav">
        <div class="lang-switch">
          <a href="{{ route('lang.switch','fr') }}" class="{{ app()->getLocale()=='fr' ? 'active' : '' }}">FR</a>
          <a href="{{ route('lang.switch','en') }}" class="{{ app()->getLocale()=='en' ? 'active' : '' }}">EN</a>
          <a href="{{ route('lang.switch','ar') }}" class="{{ app()->getLocale()=='ar' ? 'active' : '' }}">AR</a>
        </div>

        <a href="{{ route('produits.index') }}" class="{{ request()->is('produits*') ? 'active' : '' }}">
            {{ __('app.products') }}
        </a>
        <a href="{{ route('about') }}" title="À propos">{{ __('app.about') }}</a>
        <a href="{{ route('produits.create') }}" class="btn primary">{{ __('app.new') }}</a>

        {{-- Auth Links --}}
        @guest
            <a href="{{ route('login') }}" class="btn outline">{{ __('register.login') }}</a>
            @if (Route::has('register'))
                <a href="{{ route('register') }}" class="btn outline">{{ __('register.register') }}</a>
            @endif
        @else
            <div class="dropdown">
                <a href="#" class="btn outline dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown">
                    {{ Auth::user()->name }}
                </a>
                <div class="dropdown-menu" aria-labelledby="userDropdown">
                    @if(Auth::user()->role === App\Models\User::ROLE_ADMIN)
                        <a href="{{ route('admin.dashboard') }}" class="dropdown-item">Espace Admin</a>
                    @endif

                    <a class="dropdown-item" href="{{ route('logout') }}"
                       onclick="event.preventDefault();
                                 document.getElementById('logout-form').submit();">
                        {{ __('register.logout') }}
                    </a>

                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </div>
        @endguest
      </nav>
    </div>
  </header>

  {{-- CONTENU PRINCIPAL --}}
  <main class="container">
    @if(session('ok'))
      <div class="badge" style="margin:10px 0">{{ session('ok') }}</div>
    @endif

    @yield('content')

    <style>
      nav[role="navigation"] svg { width:16px; height:16px; vertical-align:middle; }
      nav[role="navigation"] .hidden { display:none; }
    </style>
  </main>

</body>
</html>
