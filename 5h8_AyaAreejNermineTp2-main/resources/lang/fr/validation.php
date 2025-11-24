<?php

return [
    'required' => 'Le champ :attribute est obligatoire.',
    'string'   => 'Le champ :attribute doit être une chaîne de caractères.',
    'numeric'  => 'Le champ :attribute doit être un nombre.',
    'integer'  => 'Le champ :attribute doit être un entier.',
    'image'    => 'Le fichier :attribute doit être une image.',
    'mimes'    => 'Le fichier :attribute doit être de type : :values.',
    'max'      => [
        'file' => 'Le fichier :attribute ne doit pas dépasser :max kilo-octets.',
        'string' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
    ],
    'exists'   => 'La valeur sélectionnée pour :attribute est invalide.',


    'attributes' => [
        'nom'        => 'nom',
        'description'=> 'description',
        'prix'       => 'prix',
        'quantite'   => 'quantité',
        'image'      => 'image',
        'category_id'=> 'catégorie',
    ],
];
