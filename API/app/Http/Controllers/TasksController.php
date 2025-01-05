<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskCreateRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{

    public function index(Request $request) {

        $tasks = Task::all();
        
        return response()->json($tasks);

    }

    public function store(TaskCreateRequest $request) {

        return 'aaaa';

    }

    public function update(Request $request) {

        return 'adada';

    }
}
