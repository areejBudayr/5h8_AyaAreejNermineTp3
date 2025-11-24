<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ArticleController;

// Redirection vers la liste des produits
Route::get('/', function () {
    return redirect()->route('produits.index');
});

// Routes pour les produits
Route::resource('produits', ProduitController::class);

// Page "À propos"
Route::view('/about', 'about')->name('about');

// Routes pour les catégories
Route::get('/categories/autocomplete', [ProduitController::class, 'autocompleteCategories'])
     ->name('categories.autocomplete');

Route::get('/categories/{categorie}', [ProduitController::class, 'showCategory'])
     ->name('categories.show');

// Espace Admin (protégé par middleware 'admin')
Route::prefix('admin')->middleware('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    // Gestion des articles
    Route::get('/articles', [ArticleController::class, 'index'])->name('admin.articles.index');
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('admin.articles.destroy');
});

// Gestion des langues
Route::get('/lang/{locale}', function ($locale) {
    abort_unless(in_array($locale, ['fr', 'en', 'ar']), 404);
    session(['locale' => $locale]);
    return back();
})->name('lang.switch');

// Routes d’authentification avec vérification email
Auth::routes(['verify' => true]);

// Route home accessible seulement aux utilisateurs connectés et vérifiés
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])
     ->middleware(['auth', 'verified'])
     ->name('home');
