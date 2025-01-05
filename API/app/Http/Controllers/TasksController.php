<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TasksController extends Controller
{

    public function index()  {

        $tasks = Task::with('category')->get();
        
        return response()->json($tasks);

    }

    public function show(string $id): JsonResponse {

        $task = Task::with('category')->find($id);

        return response()->json($task);

    }

    public function store(TaskCreateRequest $request): JsonResponse {

        $data = $request->validated();
        $task = Task::create($data);

        return response()->json($task);

    }

    public function update(TaskUpdateRequest $request, string $id): JsonResponse {

        $data = $request->validated();
        $task = Task::find($id);

        $task->update($data);

        return response()->json($task);

    }
}
