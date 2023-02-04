@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <h3>
                Products
            </h3>
        </div>
        <div class="col-md-6" align="right">
            <a class="btn btn-primary" href="{{ route('products.create') }}">
                Create
            </a>
        </div>
    </div>
    <hr>
</div>
<div id="productsTable"></div>
@endsection
