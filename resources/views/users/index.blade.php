@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <h3>
                Users
            </h3>
        </div>
        <div class="col-md-6" align="right">
            <a class="btn btn-primary" href="{{ route('users.create') }}">
                Create
            </a>
        </div>
    </div>
    <hr>
</div>
<div id="usersTable"></div>
@endsection
