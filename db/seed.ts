//Script to seed the database with some initial data
import { db } from './connection';
import { users, properties } from './schema';

async function seedDatabase() {
    await db.insert(users).values([
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
        { name: 'Charlie', email: 'charlie@example.com' },
    ]);

    await db.insert(properties).values([
        {
            address: '123 Main St',
            price: 1000000,
            bedrooms: 3,
            bathrooms: 2,
            description: 'A lovely home',
            sqft: 2000,
            image: 'https://example.com/image.jpg',
            metadata: { foo: 'bar' },
        },
        {
            address: '456 Elm St',
            price: 2000000,
            bedrooms: 4,
            bathrooms: 3,
            description: 'Another lovely home',
            sqft: 3000,
            image: 'https://example.com/image2.jpg',
            metadata: { foo: 'baz' },
        },
    ]);
    console.log('Database seeded successfully');
}

seedDatabase().catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
});

//Run this script with `node db/seed.ts` to seed the database with some initial data.

