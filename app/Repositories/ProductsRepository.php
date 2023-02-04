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

    public function removeQty($request)
    {
        $product = Products::find($request->id);
        $product->quantity = $request->qty - 1;
        $product->save();
        
        $products = Products::orderBy('updated_at', 'desc')->get();
        return response()->json([
            'products' => $products,
        ]);
    }
}