<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{

    public function show(Request $request) {

        $tasks = Task::all();
        

    }

    public function store(Request $request) {



    }
}
