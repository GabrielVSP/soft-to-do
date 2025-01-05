<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
           $table->string('color');
        });

        $categories = [
            ['name' => 'Food', 'color' => '#E4D84C'],
            ['name' => 'Sports', 'color' => '#4CA7E4'],
            ['name' => 'Work', 'color' => '#4CE486'],
            ['name' => 'Home', 'color' => '#D04CE4']
        ];

        foreach ($categories as $category) {
            DB::table('categories')->firstOrCreate($category);
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            //
        });
    }
};
