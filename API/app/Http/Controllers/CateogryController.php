<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CateogryController extends Controller
{
    public function index() {

        return response()->json(Category::all());

    }
}
