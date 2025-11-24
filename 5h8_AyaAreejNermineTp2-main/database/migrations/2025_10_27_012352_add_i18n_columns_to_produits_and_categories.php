<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddI18nColumnsToProduitsAndCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    Schema::table('produits', function (Blueprint $table) {
        $table->string('nom_en')->nullable();
        $table->string('nom_ar')->nullable();
        $table->text('description_en')->nullable();
        $table->text('description_ar')->nullable();
    });

    Schema::table('categories', function (Blueprint $table) {
        $table->string('nom_en')->nullable();
        $table->string('nom_ar')->nullable();
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
           Schema::table('produits', function (Blueprint $table) {
        $table->dropColumn(['nom_en','nom_ar','description_en','description_ar']);
    });
    Schema::table('categories', function (Blueprint $table) {
        $table->dropColumn(['nom_en','nom_ar']);
    });
    }
}
