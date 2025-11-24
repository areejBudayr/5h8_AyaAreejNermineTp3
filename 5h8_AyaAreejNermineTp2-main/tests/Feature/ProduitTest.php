<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Produit;
use App\Models\Categorie;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProduitTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function un_produit_peut_etre_cree()
    {
        $categorie = Categorie::factory()->create();

        $response = $this->post('/produits', [
            'nom' => 'Chemise bleue',
            'description' => 'Une belle chemise bleue',
            'prix' => 39.99,
            'quantite' => 10,
            'category_id' => $categorie->id
        ]);

        $response->assertRedirect('/produits');
        $this->assertDatabaseHas('produits', ['nom' => 'Chemise bleue']);
    }
        /** @test */
    public function un_produit_peut_etre_modifie()
    {
        $produit = Produit::factory()->create([
            'nom' => 'Vieux nom',
            'prix' => 50,
        ]);

        $response = $this->put("/produits/{$produit->id}", [
            'nom' => 'Nouveau nom',
            'prix' => 60,
            'quantite' => $produit->quantite,
        ]);

        $response->assertRedirect('/produits');
        $this->assertDatabaseHas('produits', ['nom' => 'Nouveau nom']);
    }
}

