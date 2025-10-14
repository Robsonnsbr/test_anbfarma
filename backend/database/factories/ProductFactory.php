<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => 'Banana Nanica',
            'description' => 'Banana fresca e madura.',
            'price' => 4.99,
            'stock' => 100,
            'image_url' => 'https://www.extraplus.com.br/uploads/produtos/original/1407_1407.png', // banana real
        ];
    }
}
