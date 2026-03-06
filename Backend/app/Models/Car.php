<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'make','model','year','price','mileage',
        'fuel_type','transmission','body_type',
        'engine', 'seats', 'doors', 'drive',
        'exterior_color', 'interior_color',
        'country','city','color','trim',
        'chassis_code', 'steering_side',
        'description','is_available','options'
    ];

    protected $casts = [
        'options' => 'array',
        'is_available' => 'boolean',
    ];

    public function images()
    {
        return $this->hasMany(CarImage::class);
    }
    
}
