<?php

namespace App\Repositories;

use App\Models\Products;
use App\Models\CategoriesProducts;
use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductsRepository
{
    public function getProducts()
    {
        $products = Products::orderBy('updated_at', 'desc')->with('categories')->get();
        return response()->json([
            'products' => $products,
        ]);
    }

    public function getSingleProduct($request)
    {
        $product = Products::where('id', $request->product_id)->with(['categories' => function ($query) {
            $query->select(['categories.id as value', 'categories.name as label']);
        }])->first();
        $categories = Categories::select(['id as value', 'name as label'])->get();
        return response()->json([
            'product' => $product,
            'categories' => $categories,
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
            CategoriesProducts::create([
                'categories_id' => $category_id,
                'products_id' => $product->id,
            ]);
        }

        return $product;
    }

    public function update($request, $id)
    {
        $product = Products::find($id);

        $fullImgPath = $product->image;
        if ($request->has('file')) {
            $image = $request->file;
            $savePath = "/public/products/images/";
            $fileName = time().'-'.$request->file->getClientOriginalName();  
            Storage::putFileAs($savePath, $image, $fileName);
            $fullImgPath = "/storage/products/images/".$fileName;
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->quantity = $request->qty;
        $product->image = $fullImgPath;
        $product->save();

        if ($request->categories) {
            CategoriesProducts::where('products_id', $product->id)->delete();
            foreach ($request->categories as $key => $category_id) {
                CategoriesProducts::create([
                    'categories_id' => $category_id,
                    'products_id' => $product->id,
                ]);
            }
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