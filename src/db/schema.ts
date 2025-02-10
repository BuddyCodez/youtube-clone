import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => [uniqueIndex("clerk_id_idx").on(table.clerkId)]);

export const userRelations = relations(users, ({ one, many }) => ({
    videos: many(videos)
}));

export const categories = pgTable("categories", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => [uniqueIndex("name_idx").on(table.name)]);

export const categoryRelations = relations(categories, ({ one, many }) => ({
    videos: many(videos)
}));

export const videos = pgTable("videos", {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    categoryId: uuid("category_id").references(() => categories.id, {
        onDelete: "set null"
    }),
    userId: uuid("user_id").references(() => users.id, {
        onDelete: "cascade",
    }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const videoRelations = relations(videos, ({ one, many }) => ({
    user: one(users, {
        fields: [videos.userId],
        references: [users.id],
    }),
    category: one(categories, {
        fields: [videos.categoryId],
        references: [categories.id],
    })
}))