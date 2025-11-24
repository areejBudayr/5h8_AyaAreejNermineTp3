<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produit;

class ProduitsTableSeeder extends Seeder
{
    public function run(): void
    {
        Produit::factory()->count(20)->create();

        // Exemples fixes
        Produit::create(['nom'=>'Laptop Pro','description'=>'15", 16Go RAM','prix'=>1299.99,'quantite'=>12]);
        Produit::create(['nom'=>'Souris sans fil','description'=>null,'prix'=>24.90,'quantite'=>150]);
    }
}
