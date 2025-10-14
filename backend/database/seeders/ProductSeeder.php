<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Banana Nanica',
                'description' => 'Bananas frescas e maduras.',
                'price' => 4.99,
                'stock' => 100,
                'image_url' => 'https://www.extraplus.com.br/uploads/produtos/original/1407_1407.png', // banana
            ],
            [
                'name' => 'Maçã Fuji',
                'description' => 'Maçãs crocantes e doces.',
                'price' => 6.50,
                'stock' => 80,
                'image_url' => 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce', // apple
            ],
            [
                'name' => 'Uva Roxa',
                'description' => 'Uvas frescas e suculentas.',
                'price' => 7.90,
                'stock' => 70,
                'image_url' => 'https://fortalfrut.com.br/wp-content/uploads/2025/02/uva-roxa.webp', // grapes
            ],
            [
                'name' => 'Morango',
                'description' => 'Morangos doces e vermelhos.',
                'price' => 8.99,
                'stock' => 60,
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/250px-PerfectStrawberry.jpg', // strawberries
            ],
            [
                'name' => 'Abacaxi',
                'description' => 'Abacaxis tropicais e refrescantes.',
                'price' => 5.75,
                'stock' => 50,
                'image_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSng-xU8hTulG04Tn2quGuWw761WTkE65miWQ&s', // pineapple
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
