@extends('layouts.app')
@section('title','Produits')
@section('header','Produits')

@section('content')
<div class="container mt-4">

    {{-- HERO / TITRE CENTRÉ --}}
    <h1>{{ __('app.title_products') }}</h1>

    {{-- FILTRES RÉORGANISÉS --}}
    <form method="GET" action="{{ route('produits.index') }}" class="filters-v3" id="filterForm">

        <div class="top-row">
            {{-- 🔍 Recherche --}}
            <div class="search-box">
                <input 
                    name="search" 
                    type="text"
                    value="{{ request('search') }}" 
                    placeholder="{{ __('app.search_name') }}"
                >
            </div>

            {{-- 🏷️ Catégories --}}
            <div class="category-box">
                <select name="category_id" onchange="document.getElementById('filterForm').submit()">
                    <option value="">{{ __('app.all_categories') }}</option>
                    @foreach($categories as $c)
                        <option value="{{ $c->id }}" @selected(request('category_id') == $c->id)>
                            {{ $c->tNom() }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="actions">
            <a href="{{ route('produits.index') }}" class="btn btn-ghost" id="resetBtn">{{ __('app.reset') }}</a>
            <button class="btn btn-primary" type="submit">{{ __('app.filter') }}</button>
        </div>
    </form>

    {{-- 🧹 Script pour supprimer les champs vides avant soumission --}}
    <script>
    document.getElementById('filterForm').addEventListener('submit', function(e) {
        const form = e.target;
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(el => {
            if (!el.value.trim()) {
                el.removeAttribute('name'); // retire les champs vides => URL propre
            }
        });
    });

    // Si tu veux que le bouton "Réinitialiser" vide aussi les champs :
    document.getElementById('resetBtn').addEventListener('click', function(e) {
        const form = document.getElementById('filterForm');
        form.querySelectorAll('input, select').forEach(el => el.value = '');
    });
    </script>

    {{-- 🔔 Message si recherche ou catégorie --}}
    @if(request('search') || request('category_id'))
        <p class="mt-3 text-muted">
            @if(request('search'))
                Résultats pour « <strong>{{ request('search') }}</strong> »
            @endif
            @if(request('category_id'))
                dans la catégorie 
                <strong>{{ $categories->firstWhere('id', request('category_id'))->tNom() }}</strong>
            @endif
        </p>
    @endif

    {{-- messages flash / erreurs --}}
    @if(session('ok'))
        <div class="alert alert-success">{{ session('ok') }}</div>
    @endif
    @if ($errors->any())
        <div class="alert alert-danger mb-3">
            <ul class="m-0 ps-3">
                @foreach ($errors->all() as $e)
                    <li>{{ $e }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    {{-- tableau --}}
    <div class="table-responsive table-card">
        <table class="table table-bordered align-middle" style="margin:0">
            <thead class="table-light">
                <tr>
                    <th style="width:72px">{{ __('app.image') }}</th>
                    <th style="width:80px">{{ __('app.id') }}</th>
                    <th>{{ __('app.name') }}</th>
                    <th style="width:140px">{{ __('app.price') }}</th>
                    <th style="width:100px">{{ __('app.qty') }}</th>
                    <th style="width:180px">{{ __('app.actions') }}</th>
                </tr>
            </thead>
            <tbody>
                @forelse($produits as $p)
                    <tr>
                        {{-- 🖼️ Image --}}
                        <td>
                            <img
                                src="{{ $p->image_url ? asset('images/'.$p->image_url) : asset('images/placeholder.png') }}"
                                alt="{{ $p->nom }}"
                                style="height:90px;width:auto;object-fit:contain;border-radius:8px;margin:auto;">
                        </td>

                        {{-- 🆔 ID --}}
                        <td>{{ $p->id }}</td>

                        {{-- 🏷️ Nom + catégorie --}}
                        <td>
                            <a href="{{ route('produits.show',$p) }}">{{ $p->nomT() }}</a>
                            @if($p->categorieRef)
                                <div class="text-muted small">{{ $p->categorieRef->tNom() }}</div>
                            @endif
                        </td>

                        {{-- 💰 Prix --}}
                        <td>{{ number_format($p->prix, 2, ',', ' ') }} $</td>

                        {{-- 📦 Quantité --}}
                        <td>{{ $p->quantite }}</td>

                        {{-- ⚙️ Actions --}}
                        <td class="text-nowrap">
                            <a class="btn btn-sm btn-outline-secondary" href="{{ route('produits.show',$p) }}">{{ __('app.show') }}</a>

                            @if(Auth::user() && Auth::user()->role === App\Models\User::ROLE_ADMIN)
                                <a class="btn btn-sm btn-warning" href="{{ route('produits.edit',$p) }}">{{ __('app.edit') }}</a>
                                <form class="d-inline" method="POST" action="{{ route('produits.destroy',$p) }}">
                                    @csrf @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger"
                                            onclick="return confirm('Supprimer ce produit ?')">{{ __('app.delete') }}</button>
                                </form>
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="text-center text-muted">Aucun produit.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- pagination (conserve les filtres) --}}
    <div class="mt-3">
        {{ $produits->withQueryString()->links() }}
    </div>
</div>
@endsection
