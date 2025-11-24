<?php

return [
    'required' => 'حقل :attribute مطلوب.',
    'string'   => 'يجب أن يكون :attribute نصاً.',
    'numeric'  => 'يجب أن يكون :attribute رقماً.',
    'integer'  => 'يجب أن يكون :attribute عدداً صحيحاً.',
    'image'    => 'يجب أن يكون :attribute صورة.',
    'mimes'    => 'يجب أن يكون :attribute من الأنواع: :values.',
    'max'      => [
        'file'   => 'يجب ألا يتجاوز حجم :attribute :max كيلوبايت.',
        'string' => 'يجب ألا يتجاوز :attribute :max حرفاً.',
    ],
    'exists'   => 'القيمة المحددة لـ :attribute غير صالحة.',

    'attributes' => [
        'nom'        => 'الاسم',
        'description'=> 'الوصف',
        'prix'       => 'السعر',
        'quantite'   => 'الكمية',
        'image'      => 'الصورة',
        'category_id'=> 'الفئة',
    ],
];
