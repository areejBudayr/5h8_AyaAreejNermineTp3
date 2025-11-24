<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            if (!Schema::hasColumn('produits', 'categorie')) $table->string('categorie')->nullable();
            if (!Schema::hasColumn('produits', 'marque'))    $table->string('marque')->nullable();
            if (!Schema::hasColumn('produits', 'taille'))    $table->string('taille')->nullable();
            if (!Schema::hasColumn('produits', 'couleur'))   $table->string('couleur')->nullable();
            if (!Schema::hasColumn('produits', 'sexe'))      $table->string('sexe')->nullable();
            if (!Schema::hasColumn('produits', 'image_url')) $table->string('image_url')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $drop = [];
            foreach (['categorie','marque','taille','couleur','sexe','image_url'] as $c) {
                if (Schema::hasColumn('produits', $c)) $drop[] = $c;
            }
            if ($drop) $table->dropColumn($drop);
        });
    }
};
