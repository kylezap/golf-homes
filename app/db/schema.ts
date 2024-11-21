//Drizzle schema definitions

import { pgTable, serial, varchar, integer, json } from "drizzle-orm/pg-core";
import { metadata } from "../layout";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email').unique().notNull(),
    createdAt: json().default('CURRENT_TIMESTAMP'),
});

export const properties = pgTable('properties', {
    id: serial('id').primaryKey(),
    address: varchar('address', { length: 255 }),
    price: integer('price'),
    bedrooms: integer('bedrooms'),
    bathrooms: integer('bathrooms'),
    sqft: integer('sqft'),
    image: varchar('image', { length: 255 }),
    createdAt: json().default('CURRENT_TIMESTAMP'),
    metadata: json('metadata'),
});