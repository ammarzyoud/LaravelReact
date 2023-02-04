@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <h3>
                Categories
            </h3>
        </div>
        <div class="col-md-6" align="right">
            <a class="btn btn-primary" href="{{ route('categories.create') }}">
                Create
            </a>
        </div>
    </div>
    <hr>
</div>
<div id="categoriesTable"></div>
@endsection
