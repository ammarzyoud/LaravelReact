<?php

namespace App\Repositories;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesRepository
{
    public function getCategories()
    {
        $categories = Categories::all();
        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function getSelectCategories()
    {
        $categories = Categories::select(['id as value', 'name as label'])->get();
        return response()->json([
            'categories' => $categories,
        ]);
    }
}