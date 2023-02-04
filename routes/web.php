<?php

use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Auth::routes();
Route::group(['middleware' => 'auth'], function () {
    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('/');
    Route::get('/getCounts', [App\Http\Controllers\HomeController::class, 'getCounts'])->name('getCounts');

    // Products
    Route::resource('products', ProductsController::class);
    Route::get('/getProducts', [ProductsController::class, 'getProducts'])->name('getProducts');
    Route::post('/removeQty', [ProductsController::class, 'removeQty'])->name('removeQty');

    // 
    Route::get('/getSelectCategories', [CategoriesController::class, 'getSelectCategories'])->name('getSelectCategories');
});

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
