<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Repositories\ProductsRepository;
use App\Repositories\CategoriesRepository;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    protected $productsRepository;
    protected $categoriesRepository;
    public function __construct(ProductsRepository $productsRepository, CategoriesRepository $categoriesRepository)
    {
        $this->productsRepository = $productsRepository;
        $this->categoriesRepository = $categoriesRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('products.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('products.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->productsRepository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product_id = $id;
        return view('products.edit', compact('product_id'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return $this->productsRepository->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $products)
    {
        //
    }

    public function getProducts()
    {
        return $this->productsRepository->getProducts();
    }
    
    public function getSingleProduct(Request $request)
    {
        return $this->productsRepository->getSingleProduct($request);
    }

    public function removeQty(Request $request)
    {
        return $this->productsRepository->removeQty($request);
    }
}
