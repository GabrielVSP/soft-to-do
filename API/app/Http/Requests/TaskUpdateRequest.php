<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable','string','max:255'],
            'description' => ['nullable','string'],
            'status' => ['nullable','string','max:500'],
            'category_id' => ['nullable','integer','exists:categories,id'],
            'completion_date' => ['nullable','string']
        ];
    }
}
