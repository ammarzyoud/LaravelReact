<?php

use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\UsersController;
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
    Route::get('/getSingleProduct', [ProductsController::class, 'getSingleProduct'])->name('getSingleProduct');
    Route::post('/updateProduct/{id}', [ProductsController::class, 'update'])->name('updateProduct');
    Route::post('/removeQty', [ProductsController::class, 'removeQty'])->name('removeQty');
    
    // Categories
    Route::resource('categories', CategoriesController::class);
    Route::get('/getCategories', [CategoriesController::class, 'getCategories'])->name('getCategories');
    Route::get('/getSingleCategory', [CategoriesController::class, 'getSingleCategory'])->name('getSingleCategory');
    Route::post('/updateCategory/{id}', [CategoriesController::class, 'update'])->name('updateCategory');
    Route::get('/getSelectCategories', [CategoriesController::class, 'getSelectCategories'])->name('getSelectCategories');

    // Users
    Route::resource('users', UsersController::class);
    Route::get('/getUsers', [UsersController::class, 'getUsers'])->name('getUsers');
    Route::get('/getSingleUser', [UsersController::class, 'getSingleUser'])->name('getSingleUser');
    Route::post('/updateUser/{id}', [UsersController::class, 'update'])->name('updateUser');
});

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
