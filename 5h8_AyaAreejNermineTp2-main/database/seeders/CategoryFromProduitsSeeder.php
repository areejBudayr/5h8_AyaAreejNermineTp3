<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categorie;
use App\Models\Produit;

class CategoryFromProduitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         // on crée les catégories depuis le champ texte 'categorie'
        $noms = Produit::query()
            ->whereNotNull('categorie')
            ->where('categorie', '!=', '')
            ->distinct()
            ->pluck('categorie');

        foreach ($noms as $nom) {
            Categorie::firstOrCreate(['nom' => $nom]);
        }

        // on rattache les produits (category_id)
        $map = Categorie::all()->pluck('id','nom');
        Produit::whereNotNull('categorie')->chunk(200, function($chunk) use ($map){
            foreach ($chunk as $p) {
                if (isset($map[$p->categorie])) {
                    $p->category_id = $map[$p->categorie];
                    $p->save();
                }
            }
        });
    }
}
