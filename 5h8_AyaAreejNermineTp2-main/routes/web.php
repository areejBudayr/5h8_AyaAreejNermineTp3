<?php

use Illuminate\Support\Facades\Route;

Route::view('/{any}', 'monopage')->where('any', '.*');

