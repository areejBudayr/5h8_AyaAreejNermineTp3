@extends('layouts.app')
@section('title','Modifier produit')
@section('header','Modifier produit')

@section('content')

@auth
    @if(Auth::user()->role === App\Models\User::ROLE_ADMIN)

        <div class="page-toolbar">
            <h2 class="title">{{ __('products.edit_product') }}</h2>
        </div>

        <form method="POST" action="{{ route('produits.update',$produit) }}" enctype="multipart/form-data" class="form-card">
            @csrf @method('PUT')

            <div class="form-grid">
                <div class="full">
                    <label for="image">{{ __('products.image_label') }}</label>
                    @if($produit->image_url)
                        <img src="{{ asset('images/'.$produit->image_url) }}" alt="" class="image-preview" style="margin-bottom:8px">
                    @endif
                    <input id="image" type="file" name="image" accept=".jpg,.jpeg,.png,.webp">
                </div>

                <div class="full">
                    <label for="nom">{{ __('products.name') }}</label>
                    <input id="nom" type="text" name="nom" value="{{ old('nom',$produit->nom) }}" required>
                </div>

                <div class="full">
                    <label for="description">{{ __('products.description') }}</label>
                    <textarea id="description" name="description">{{ old('description',$produit->description) }}</textarea>
                </div>

                <div>
                    <label for="prix">{{ __('products.price') }}</label>
                    <input id="prix" type="number" step="0.01" min="0" name="prix" value="{{ old('prix',$produit->prix) }}" required>
                </div>

                <div>
                    <label for="quantite">{{ __('products.quantity') }}</label>
                    <input id="quantite" type="number" min="0" name="quantite" value="{{ old('quantite',$produit->quantite) }}" required>
                </div>

                <div class="mb-3">
                    <label for="category_id" class="form-label">{{ __('products.category') }}</label>
                    <select name="category_id" id="category_id" class="form-select" style="max-width:420px">
                        <option value="">{{ __('products.none') }}</option>
                        @foreach($categories as $c)
                            <option value="{{ $c->id }}" {{ old('category_id', $produit->category_id) == $c->id ? 'selected' : '' }}>
                                {{ $c->tNom() }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="form-actions">
                <a href="{{ route('produits.index') }}" class="btn btn-ghost">{{ __('products.cancel') }}</a>
                <button class="btn btn-primary" type="submit">{{ __('products.update') }}</button>
            </div>
        </form>

    @else
        <div class="alert alert-danger">
            Vous n'avez pas la permission de modifier ce produit.
        </div>
    @endif
@endauth

@endsection
