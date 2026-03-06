<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('make');
            $table->string('model');
            $table->year('year');
            $table->decimal('price', 10, 2);
            $table->integer('mileage')->default(0);
            $table->string('fuel_type');
            $table->string('transmission');
            $table->string('body_type');
            $table->string('engine')->nullable();
            $table->integer('seats')->nullable();
            $table->integer('doors')->nullable();
            $table->string('luggage')->nullable();
            $table->string('drive')->nullable();
            $table->string('fuel_economy')->nullable();
            $table->string('exterior_color')->nullable();
            $table->string('interior_color')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('color')->nullable();
            $table->string('power')->nullable();
            $table->string('trim')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_available')->default(true);
            $table->json('options')->nullable();
            $table->json('images')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
