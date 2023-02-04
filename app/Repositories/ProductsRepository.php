<?php

namespace App\Repositories;

use App\Models\Products;
use App\Models\ProductsCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductsRepository
{
    public function getProducts()
    {
        $products = Products::orderBy('updated_at', 'desc')->get();
        return response()->json([
            'products' => $products,
        ]);
    }

    public function store($request)
    {
        $fullImgPath = "";
        if ($request->has('file')) {
            $image = $request->file;
            $savePath = "/public/products/images/";
            $fileName = time().'-'.$request->file->getClientOriginalName();  
            Storage::putFileAs($savePath, $image, $fileName);
            $fullImgPath = "/storage/products/images/".$fileName;
        }

        $product = Products::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->qty,
            'image' => $fullImgPath,
        ]);

        foreach ($request->categories as $key => $category_id) {
            ProductsCategories::create([
                'category_id' => $category_id,
                'product_id' => $product->id,
            ]);
        }

        return $product;
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