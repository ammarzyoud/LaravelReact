@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <a href="/products">Products</a> / Edit Product
        </div>
    </div>
    <hr>
</div>
<div id="editProduct" product_id="{{ $product_id }}"></div>
@endsection
