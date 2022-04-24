<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoStoreRequest;
use App\Http\Requests\TodoUpdateRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todo::all();

        return response(TodoResource::collection($todos), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TodoStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TodoStoreRequest $request)
    {
        $validated = $request->validated();

        $todo = Todo::create($validated);

        return response(new TodoResource($todo), Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response([
                'message' => "Todo with ID \"$id\" not found."
            ], Response::HTTP_NOT_FOUND);
        }

        return response(new TodoResource($todo), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  TodoUpdateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TodoUpdateRequest $request, int $id)
    {
        $validated = $request->validated();

        $todo = Todo::find($id);

        if (!$todo) {
            return response([
                'message' => "Todo with ID \"$id\" not found."
            ], Response::HTTP_NOT_FOUND);
        }

        $todo->update($validated);

        return response(new TodoResource($todo), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response([
                'message' => "Todo with ID \"$id\" not found."
            ], Response::HTTP_NOT_FOUND);
        }

        $todo->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
