<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{

    public function index() {

        $tasks = Task::paginate(10);
        
        return response()->json($tasks);

    }

    public function show(string $id) {

        $task = Task::find($id);

        return response()->json($task);

    }

    public function store(TaskCreateRequest $request) {

        $data = $request->validated();
        $task = Task::create($data);

        return response()->json($task);

    }

    public function update(TaskUpdateRequest $request, string $id) {

        $data = $request->validated();
        $task = Task::find($id);

        $task->update($data);

        return response()->json($task);

    }
}
