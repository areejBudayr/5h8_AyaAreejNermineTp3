<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\ProduitController as ApiProduitController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// PRODUITS
Route::get('/produits', [ApiProduitController::class, 'index']);
Route::post('/produits', [ApiProduitController::class, 'store']);
Route::get('/produits/{id}', [ApiProduitController::class, 'show']);
Route::put('/produits/{id}', [ApiProduitController::class, 'update']);
Route::delete('/produits/{id}', [ApiProduitController::class, 'destroy']);
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [RegisterController::class, 'login']);

// Routes protégées par Sanctum
// Route::middleware('auth:sanctum')->group(function () {
    // Route::apiResource('produits', ApiProduitController::class);
// });