@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <a href="/users">Users</a> / Edit User
        </div>
    </div>
    <hr>
</div>
<div id="editUser" user_id="{{ $user_id }}"></div>
@endsection
