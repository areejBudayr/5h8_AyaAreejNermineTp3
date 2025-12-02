<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NAAR Boutique SPA</title>

    {{-- CSS compilé par Laravel Mix --}}
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    {{-- CSRF pour les requêtes fetch --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- 🔑 clé reCAPTCHA envoyée à React --}}
    <meta name="recaptcha-site-key" content="{{ env('RECAPTCHA_SITE_KEY') }}">

    {{-- Script reCAPTCHA v2 checkbox --}}
    <script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>
</head>
<body>
    <div id="app"></div>

    {{-- JS React compilé --}}
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
