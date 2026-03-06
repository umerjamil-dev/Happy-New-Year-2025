<?php
namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\CarImage;
use App\Mail\TotalPriceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{
    private function uploadImages($images, $carId)
    {
        $dir = public_path('uploads/cars');

        // Directory create if not exists
        if (!File::exists($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        foreach ($images as $image) {
            $name = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move($dir, $name);
            $path = 'uploads/cars/' . $name;

            CarImage::create([
                'car_id' => $carId,
                'path' => $path
            ]);
        }
    }

    // ✅ CREATE
    public function store(Request $request)
    {
        Log::info('Car Store Request Data:', $request->all());

        try {
            $car = Car::create([
                'make'           => $request->make,
                'model'          => $request->model,
                'year'           => $request->year,
                'price'          => $request->price,
                'mileage'        => $request->mileage,
                'fuel_type'      => $request->fuelType,
                'transmission'   => $request->transmission,
                'body_type'      => $request->bodyType,
                'engine'         => $request->engine,
                'seats'          => $request->seats,
                'doors'          => $request->doors,
                'drive'          => $request->drive,
                'exterior_color' => $request->color, 
                'interior_color' => $request->trim,  
                'country'        => $request->country,
                'city'           => $request->city,
                'color'          => $request->color,
                'trim'           => $request->trim,
                'chassis_code'   => $request->chassisCode,
                'steering_side'  => $request->steeringSide,
                'description'    => $request->description,
                'is_available'   => filter_var($request->isAvailable, FILTER_VALIDATE_BOOLEAN),
                'options'        => $request->options,
            ]);

            if ($request->hasFile('images')) {
                Log::info('Car Store has images');
                $this->uploadImages($request->file('images'), $car->id);
            }

            return response()->json([
                'success' => true,
                'data' => $car->load('images')
            ]);
        } catch (\Exception $e) {
            Log::error('Car Store Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to save car: ' . $e->getMessage()
            ], 500);
        }
    }

    // ✅ GET ALL WITH FILTERS
    public function index(Request $request)
    {
        $query = Car::with('images');

        // Filter by Make
        if ($request->has('make') && !empty($request->make)) {
            $query->where('make', $request->make);
        }

        // Filter by Model (which is treated as Year in frontend dropdown sometimes)
        if ($request->has('model') && !empty($request->model)) {
             $query->where('year', $request->model);
        }

        // Filter by Year Range (Explicit)
        if ($request->has('yearFrom') && !empty($request->yearFrom)) {
            $query->where('year', '>=', $request->yearFrom);
        }
        if ($request->has('yearTo') && !empty($request->yearTo)) {
            $query->where('year', '<=', $request->yearTo);
        }

        // Filter by Price Range
        if ($request->has('priceFrom') && !empty($request->priceFrom)) {
            $query->where('price', '>=', $request->priceFrom);
        }
        if ($request->has('priceTo') && !empty($request->priceTo)) {
            $query->where('price', '<=', $request->priceTo);
        }

        // Filter by Mileage Range
        if ($request->has('mileageFrom') && !empty($request->mileageFrom)) {
            $query->where('mileage', '>=', $request->mileageFrom);
        }
        if ($request->has('mileageTo') && !empty($request->mileageTo)) {
            $query->where('mileage', '<=', $request->mileageTo);
        }

        // Filter by Fuel Type
        if ($request->has('fuelType') && !empty($request->fuelType)) {
            $query->where('fuel_type', $request->fuelType);
        }

        // Filter by Transmission
        if ($request->has('transmission') && !empty($request->transmission)) {
            $query->where('transmission', $request->transmission);
        }

        // Filter by Body Type
        if ($request->has('bodyType') && !empty($request->bodyType)) {
            $query->where('body_type', $request->bodyType);
        }

        // Filter by Country
        if ($request->has('country') && !empty($request->country)) {
            $query->where('country', $request->country);
        }

        return $query->latest()->get();
    }

    // ✅ GET SINGLE
    public function show($id)
    {
        return Car::with('images')->findOrFail($id);
    }

    // ✅ UPDATE
    public function update(Request $request, $id)
    {
        Log::info('Car Update Request Data ID: ' . $id, $request->all());

        try {
            $car = Car::findOrFail($id);

            $car->update([
                'make'           => $request->make,
                'model'          => $request->model,
                'year'           => $request->year,
                'price'          => $request->price,
                'mileage'        => $request->mileage,
                'fuel_type'      => $request->fuelType,
                'transmission'   => $request->transmission,
                'body_type'      => $request->bodyType,
                'engine'         => $request->engine,
                'seats'          => $request->seats,
                'doors'          => $request->doors,
                'drive'          => $request->drive,
                'exterior_color' => $request->color,
                'interior_color' => $request->trim,
                'country'        => $request->country,
                'city'           => $request->city,
                'color'          => $request->color,
                'trim'           => $request->trim,
                'chassis_code'   => $request->chassisCode,
                'steering_side'  => $request->steeringSide,
                'description'    => $request->description,
                'is_available'   => filter_var($request->isAvailable, FILTER_VALIDATE_BOOLEAN),
                'options'        => $request->options,
            ]);

            if ($request->hasFile('images')) {
                 Log::info('Car Update has new images');
                $this->uploadImages($request->file('images'), $car->id);
            }

            return response()->json([
                'success' => true,
                'data' => $car->load('images')
            ]);
        } catch (\Exception $e) {
            Log::error('Car Update Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update car: ' . $e->getMessage()
            ], 500);
        }
    }

    // ✅ DELETE SINGLE IMAGE
    public function deleteImage($id)
    {
        $image = CarImage::findOrFail($id);

        if ($image->path && File::exists(public_path($image->path))) {
            File::delete(public_path($image->path));
        }
        
        $image->delete();

        return response()->json(['success' => true]);
    }

    // ✅ DELETE CAR + ALL IMAGES
    public function destroy($id)
    {
        Log::info('Car Delete Request ID: ' . $id);
        
        try {
            $car = Car::findOrFail($id);
            $images = $car->images()->get();

            if ($images) {
                foreach ($images as $img) {
                    if ($img->path && File::exists(public_path($img->path))) {
                        File::delete(public_path($img->path));
                    }
                    $img->delete();
                }
            }

            $car->delete();

            return response()->json(['success' => true, 'message' => 'Car and associated images deleted successfully']);

        } catch (\Exception $e) {
            Log::error('Car Delete Error: ' . $e->getMessage());
            return response()->json([
                'success' => false, 
                'message' => 'Failed to delete car: ' . $e->getMessage()
            ], 500);
        }
    }

    // ✅ REQUEST TOTAL PRICE (EMAIL)
    public function requestTotalPrice(Request $request)
    {
        Log::info('Total Price Request Data:', $request->all());

        try {
            $details = [
                'car_id'    => $request->car_id,
                'car_name'  => $request->car_name,
                'car_year'  => $request->car_year,
                'car_price' => $request->car_price,
                'port'      => $request->port,
                'email'     => $request->email,
                'phone'     => $request->phone,
            ];

            // Send Email
            Mail::to('info@suijapan.com')->send(new TotalPriceRequest($details));

            return response()->json([
                'success' => true,
                'message' => 'Your request has been sent successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Total Price Request Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to send request: ' . $e->getMessage()
            ], 500);
        }
    }
}
