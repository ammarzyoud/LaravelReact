<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use App\Models\Products;
use App\Models\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function getCounts()
    {
        $usersCount = User::count();
        $categoriesCount = Categories::count();
        $productsCount = Products::count();
        return response()->json([
            'usersCount' => $usersCount,
            'categoriesCount' => $categoriesCount,
            'productsCount' => $productsCount,
        ]);
    }
    
}
