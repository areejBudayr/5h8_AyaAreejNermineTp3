<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends BaseController
{
    // GET /api/produits
    public function index()
    {
        $produits = Produit::all();
        return $this->sendResponse($produits, 'Liste des produits.');
    }

    // POST /api/produits
    public function store(Request $request)
    {
        $data = $request->validate([
            'nom'         => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix'        => 'required|numeric|min:0',
            'quantite'    => 'required|integer|min:0',
            'categorie'   => 'nullable|string|max:50',
            'marque'      => 'nullable|string|max:50',
            'taille'      => 'nullable|string|max:10',
            'couleur'     => 'nullable|string|max:30',
            'sexe'        => 'nullable|string|max:10',
            'image_url'   => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $produit = Produit::create($data);

        return $this->sendResponse($produit, 'Produit créé.');
    }

    // GET /api/produits/{id}
    public function show($id)
    {
        $produit = Produit::findOrFail($id);
        return $this->sendResponse($produit, 'Détails du produit.');
    }

    // PUT /api/produits/{id}
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        $produit->update($request->all());

        return $this->sendResponse($produit, 'Produit mis à jour.');
    }

    // DELETE /api/produits/{id}
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();

        return $this->sendResponse(null, 'Produit supprimé.');
    }
}
