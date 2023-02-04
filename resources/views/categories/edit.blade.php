@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <a href="/categories">Categories</a> / Edit Category
        </div>
    </div>
    <hr>
</div>
<div id="editCategory" category_id="{{ $category_id }}"></div>
@endsection
