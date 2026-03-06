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
        Schema::table('cars', function (Blueprint $table) {
            $table->string('chassis_code')->nullable()->after('trim');
            $table->string('steering_side')->nullable()->after('chassis_code');
            
            // Removing old fields for a clean update
            $table->dropColumn(['power', 'fuel_economy', 'luggage']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['chassis_code', 'steering_side']);

            // Re-adding old fields if rolled back
            $table->string('power')->nullable();
            $table->string('fuel_economy')->nullable();
            $table->string('luggage')->nullable();
        });
    }
};
