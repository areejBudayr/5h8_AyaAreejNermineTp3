<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom','description','prix','quantite',
        'categorie','marque','taille','couleur','sexe','image_url','category_id','nom_en','nom_ar','description_en','description_ar', 
    ];

    public function categorieRef()
{
    return $this->belongsTo(\App\Models\Categorie::class, 'category_id');
}
public function t(string $base)
{
    $loc = app()->getLocale(); // fr|en|ar
    if ($loc === 'fr') return $this->{$base} ?? null;
    $attr = $base.'_'.$loc;
    return $this->{$attr} ?? $this->{$base}; 
}

public function nomT() { return $this->t('nom'); }
public function descriptionT() { return $this->t('description'); }
}
