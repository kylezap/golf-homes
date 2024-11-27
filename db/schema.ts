//Drizzle schema definitions

import {
  pgTable,
  serial,
  varchar,
  integer,
  json,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email").unique().notNull(),
  },

  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    }
  }
)

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  address: varchar("address"),
  price: integer("price"),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  description: varchar("description"),
  sqft: integer("sqft"),
  image: varchar("image"),
  metadata: jsonb("metadata"),
});
