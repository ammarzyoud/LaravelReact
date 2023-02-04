<?php

namespace App\Repositories;

use App\Models\Categories;

class CategoriesRepository
{
    public function getCategories()
    {
        $categories = Categories::with('products')->get();
        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function getSingleCategory($request)
    {
        $category = Categories::where('id', $request->category_id)->with('products')->first();
        return response()->json([
            'category' => $category,
        ]);
    }

    public function getSelectCategories()
    {
        $categories = Categories::select(['id as value', 'name as label'])->get();
        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function store($request)
    {
        $category = Categories::create([
            'name' => $request->name,
        ]);

        return $category;
    }

    public function update($request, $id)
    {
        $category = Categories::find($id);
        $category->name = $request->name;
        $category->save();

        return $category;
    }

    public function destroy($id)
    {
        $category = Categories::find($id);
        $category->delete();
        $categories = Categories::with('products')->get();

        return response()->json([
            'success' => true,
            'message' => 'category has been deleted',
            'categories' => $categories,
        ]);
    }
}