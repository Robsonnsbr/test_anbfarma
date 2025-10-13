<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Authenticate as API user (Sanctum)
        $user = User::factory()->create([
            'email' => 'tester@example.com',
            'password' => Hash::make('123456'),
        ]);

        Sanctum::actingAs($user);
    }

    /** @test */
    public function it_handles_basic_crud_on_products(): void
    {
        // List (empty)
        $this->getJson('/api/v1/products')
            ->assertOk();

        // Create (minimal required fields)
        $createPayload = [
            'name'  => 'Banana Nanica',
            'price' => 4.99,
            'stock' => 50,
        ];

        $createRes = $this->postJson('/api/v1/products', $createPayload)
            ->assertCreated()
            ->assertJsonFragment(['name' => 'Banana Nanica']);

        $productId = $createRes->json('id') ?? $createRes->json('data.id');

        // List (now should have at least 1)
        $this->getJson('/api/v1/products')
            ->assertOk();

        // Update
        $updatePayload = [
            'name'  => 'Banana Nanica Premium',
            'price' => 5.49,
            'stock' => 60,
        ];

        $this->putJson("/api/v1/products/{$productId}", $updatePayload)
            ->assertOk()
            ->assertJsonFragment(['name' => 'Banana Nanica Premium']);

        $this->assertDatabaseHas('products', [
            'id'    => $productId,
            'name'  => 'Banana Nanica Premium',
            'price' => 5.49,
            'stock' => 60,
        ]);

        // Delete
        $this->deleteJson("/api/v1/products/{$productId}")
            ->assertSuccessful(); // accepts 200 or 204

        $this->assertDatabaseMissing('products', ['id' => $productId]);
    }
}
