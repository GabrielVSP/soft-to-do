<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    protected $fillable = [
        'title',
        'description',
        'status',
        'user_id',
        'completion_date',
        'category_id'
    ];

    public function user() { 
        return $this->belongsTo(User::class); 
    } 

    public function category() { 
        return $this->belongsTo(Category::class);
    }
}
