<?php
namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Categorie;
use Illuminate\Support\Facades\DB;

class ProduitController extends Controller
{
    public function index(Request $r)
    {
        $q = Produit::query()->orderBy('created_at','desc');


        // filtres optionnels
        if ($r->filled('search')) {
    $search = trim($r->search);
    $q->where(function($w) use ($search) {
        $w->where(DB::raw('LOWER(nom)'), 'like', '%' . strtolower($search) . '%')
          ->orWhere(DB::raw('LOWER(description)'), 'like', '%' . strtolower($search) . '%');
    });
}



if ($r->has('category_id') && $r->category_id !== '') {
    $q->where('category_id', $r->category_id);
}

if ($r->filled('taille')) {
    $q->where('taille', $r->taille);
}

if ($r->filled('sexe')) {
    $q->where('sexe', $r->sexe);
}


        $produits = $q->paginate(10)->appends($r->query());
        $categories = Categorie::orderBy('nom')->get();
        
        return view('produits.index', compact('produits','categories'));
    }

    public function create()
    {
       $categories = Categorie::orderBy('nom')->get();
    return view('produits.create', compact('categories'));
    }

    public function store(Request $r)
    {
        $data = $this->rules($r);

         // si une image a été envoyée, on la sauvegarde et on met son nom dans image_url
    if ($r->hasFile('image')) {
        $file = $r->file('image');
        $name = Str::uuid().'.'.$file->getClientOriginalExtension(); // nom unique
        $file->move(public_path('images'), $name);                  
        $data['image_url'] = $name;                                  // on enregistre le nom
    }
        Produit::create($data);
        return redirect()->route('produits.index')->with('ok', 'Produit ajouté.');
    }

    public function show(Produit $produit)
    {
        return view('produits.show', compact('produit'));
    }

    public function edit(Produit $produit)
    {
         $categories = Categorie::orderBy('nom')->get();
    return view('produits.edit', compact('produit','categories'));
    }

    public function update(Request $r, Produit $produit)
    {
        $data = $this->rules($r);

        // si une image a été envoyée, on la sauvegarde et on met son nom dans image_url
    if ($r->hasFile('image')) {
        $file = $r->file('image');
        $name = Str::uuid().'.'.$file->getClientOriginalExtension(); 
        $file->move(public_path('images'), $name);                  
        $data['image_url'] = $name;                                  // on enregistre le nom
    }
        $produit->update($data);
        return redirect()->route('produits.index')->with('ok', 'Produit modifié.');
    }

    public function destroy(Produit $produit)
    {
        $produit->delete();
        return redirect()->route('produits.index')->with('ok', 'Produit supprimé.');
    }

    /** Valide et retourne les données autorisées */
    private function rules(Request $r): array
    {
        return $r->validate([
            'nom'         => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix'        => 'required|numeric|min:0',
            'quantite'    => 'required|integer|min:0',
            'categorie'   => 'nullable|string|max:50',
            'marque'      => 'nullable|string|max:50',
            'taille'      => 'nullable|string|max:10',
            'couleur'     => 'nullable|string|max:30',
            'sexe'        => 'nullable|string|max:10',
            'image'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'category_id' => 'nullable|exists:categories,id',
        ]);
    } 

public function autocompleteCategories(Request $r)
{
    $q = trim($r->get('q',''));
    if ($q === '') return response()->json([]);

    // INNER JOIN pour compter le nb de produits par catégorie
    $rows = Categorie::select('categories.id','categories.nom', DB::raw('COUNT(produits.id) as nb'))
        ->join('produits','produits.category_id','=','categories.id') // INNER JOIN
        ->where('categories.nom','like','%'.$q.'%')
        ->groupBy('categories.id','categories.nom')
        ->orderBy('categories.nom')
        ->limit(8)
        ->get();

    return response()->json($rows);
}

// Page d'une catégorie
public function showCategory(Categorie $categorie)
{
    $produits = $categorie->produits()->latest()->paginate(12);
    return view('categories.show', compact('categorie','produits'));
}
}
