<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Produit;

class ProduitFactory extends Factory
{
    protected $model = Produit::class;

    public function definition(): array
    {
        return [
            'nom' => $this->faker->unique()->words(2, true),
            'description' => $this->faker->optional()->sentence(12),
            'prix' => $this->faker->randomFloat(2, 5, 1500),
            'quantite' => $this->faker->numberBetween(0, 200),
        ];
    }
}
