@extends('layouts.app')

@section('title', 'Détail produit')
@section('header', 'Détail produit')

@section('content')
<div class="container mt-4">
    <h2>{{ __('app.detail_product') }}</h2>
    <div class="card p-4 shadow-sm">

     {{-- Image si disponible --}} 
    @if($produit->image_url)
      <p style="margin:0 0 12px">
        <img src="{{ asset('images/'.$produit->image_url) }}"
             alt="Image {{ $produit->nom }}"
             style="max-height:260px;border-radius:12px;display:block">
      </p>
    @endif
        <p><strong>{{ __('app.name') }} :</strong> {{ $produit->nomT() }}</p>
        <p><strong>{{ __('app.description') }} :</strong> {{ $produit->descriptionT() ?? '—' }}</p>
        <p><strong>{{ __('app.price') }}:</strong> {{ number_format($produit->prix, 2, ',', ' ') }} $</p>
        <p><strong>{{ __('app.qty') }}:</strong> {{ $produit->quantite }}</p>
        @if($produit->categorieRef)
    <p><strong>{{ __('app.category') }}:</strong> {{ $produit->categorieRef->tNom() }}</p>
@endif
    </div>

    <a href="{{ route('produits.index') }}" class="btn btn-secondary mt-3">{{ __('app.back_to_list') }}</a>
</div>
@endsection
