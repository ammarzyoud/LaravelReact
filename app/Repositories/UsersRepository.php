<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UsersRepository
{
    public function getUsers()
    {
        $users = User::orderBy('updated_at', 'desc')->get();
        return response()->json([
            'users' => $users,
        ]);
    }

    public function getSingleUser($request)
    {
        $user = User::find($request->user_id);
        return response()->json([
            'user' => $user,
        ]);
    }
    
    public function store($request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:50',
            'email' => 'required|email|unique:users',
            'password' => ['required', 'confirmed', Password::min(8)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols()
            ],
        ]);
        
        if ($validator->fails())
        {
            return response()->json(['errors' => $validator->errors()]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return $user;
    }

    public function update($request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:50',
            'email' => 'required|email|unique:users,email,'.$id,
        ]);
        
        if ($validator->fails())
        {
            return response()->json(['errors' => $validator->errors()]);
        }

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return $user;
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        $users = User::orderBy('updated_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'User has been deleted',
            'users' => $users,
        ]);
    }
}