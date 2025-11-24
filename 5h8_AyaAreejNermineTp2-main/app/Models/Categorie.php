<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
   use HasFactory;
    protected $fillable = ['nom','nom_en','nom_ar'];

    public function produits()
    {
        return $this->hasMany(Produit::class, 'category_id');
    }
    public function tNom()
{
    $loc = app()->getLocale();
    if ($loc === 'fr') return $this->nom;
    $attr = 'nom_'.$loc;
    return $this->{$attr} ?? $this->nom;
}
}
