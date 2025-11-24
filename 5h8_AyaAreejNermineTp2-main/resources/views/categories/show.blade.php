@extends('layouts.app')
@section('title','Catégorie: '.$categorie->tNom())
@section('header','Catégorie: '.$categorie->tNom())

@section('content')
<div class="container mt-4">

  <div class="page-toolbar">
    <h2 class="title">{{ $categorie->tNom() }}</h2>
    <p class="page-sub">{{ $produits->total() }} produit(s)</p>
  </div>

  <div class="table-responsive" style="box-shadow:0 12px 24px rgba(20,20,40,.05);border-radius:14px">
    <table class="table table-bordered align-middle" style="margin:0;border-radius:14px;overflow:hidden">
      <thead class="table-light">
        <tr>
          <th style="width:72px">Image</th>
          <th>#</th>
          <th>Nom</th>
          <th>Prix</th>
          <th>Qté</th>
        </tr>
      </thead>
      <tbody>
      @forelse($produits as $p)
        <tr>
          <td>
            @if($p->image_url)
              <img src="{{ asset('images/'.$p->image_url) }}"
                   style="height:48px;width:auto;object-fit:contain;border-radius:8px;display:block;margin:auto">
            @endif
          </td>
          <td>{{ $p->id }}</td>
          <td><a href="{{ route('produits.show',$p) }}">{{ $p->nom }}</a></td>
          <td>{{ number_format($p->prix,2,',',' ') }} $</td>
          <td>{{ $p->quantite }}</td>
        </tr>
      @empty
        <tr><td colspan="5" class="text-center text-muted">Aucun produit.</td></tr>
      @endforelse
      </tbody>
    </table>
  </div>

  <div class="mt-3">{{ $produits->withQueryString()->links() }}</div>
</div>
@endsection
