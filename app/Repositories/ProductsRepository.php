<?php

namespace App\Repositories;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductsRepository
{
    public function getProducts()
    {
        $products = Products::orderBy('updated_at', 'desc')->get();
        return response()->json([
            'products' => $products,
        ]);
    }
}