<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Produit;

class ProduitUnitTest extends TestCase
{
    /** @test */
    public function le_getter_et_setter_nom_fonctionne()
    {
        $produit = new Produit();
        $produit->nom = 'Pantalon noir';

        $this->assertEquals('Pantalon noir', $produit->nom);
    }

    /** @test */
    public function le_getter_et_setter_prix_fonctionne()
    {
        $produit = new Produit();
        $produit->prix = 99.99;

        $this->assertEquals(99.99, $produit->prix);
    }
}
