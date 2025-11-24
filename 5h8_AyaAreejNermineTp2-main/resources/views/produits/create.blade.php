@extends('layouts.app')
@section('title','Nouveau produit')
@section('header','Nouveau produit')

@section('content')

@auth
    @if(Auth::user()->role === App\Models\User::ROLE_ADMIN)

        <div class="page-toolbar">
          <h2 class="title">{{ __('products.new_product') }}</h2>
        </div>

        @if ($errors->any())
          <div style="background:#ffe5e5;color:#b30000;padding:10px;border-radius:8px;margin-bottom:15px;">
            <strong>{{ __('messages.error_title') }}</strong>
            <ul style="margin-top:8px;">
              @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div>
        @endif

        <form method="POST" action="{{ route('produits.store') }}" enctype="multipart/form-data" class="form-card">
          @csrf
          <div class="form-grid">
            <div class="full">
              <label for="nom">{{ __('products.name') }}</label>
              <input id="nom" type="text" name="nom" value="{{ old('nom') }}" required>
            </div>

            <div class="full">
              <label for="description">{{ __('products.description') }}</label>
              <textarea id="description" name="description">{{ old('description') }}</textarea>
            </div>

            <div>
              <label for="prix">{{ __('products.price') }}</label>
              <input id="prix" type="number" step="0.01" min="0" name="prix" value="{{ old('prix') }}" required>
            </div>

            <div>
              <label for="quantite">{{ __('products.quantity') }}</label>
              <input id="quantite" type="number" min="0" name="quantite" value="{{ old('quantite') }}" required>
            </div>

            <select name="category_id" id="category_id" class="form-select" style="max-width:420px">
              <option value="">{{ __('products.none') }}</option>
              @foreach($categories as $c)
                <option value="{{ $c->id }}" {{ old('category_id') == $c->id ? 'selected' : '' }}>
                  {{ $c->tNom() }}
                </option>
              @endforeach
            </select>

            <div class="full">
              <label for="image">{{ __('products.image_label') }}</label>
              <input id="image" type="file" name="image" accept=".jpg,.jpeg,.png,.webp">
            </div>
          </div>

          <div class="form-actions">
            <a href="{{ route('produits.index') }}" class="btn btn-ghost">{{ __('products.cancel') }}</a>
            <button class="btn btn-primary" type="submit">{{ __('products.save') }}</button>
          </div>
        </form>

    @else
        <div class="alert alert-danger">
            Vous n'avez pas la permission de créer un produit.
        </div>
    @endif
@endauth

@endsection
