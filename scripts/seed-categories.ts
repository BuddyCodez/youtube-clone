import { db } from "@/db";
import { categories as categoriesSchema } from "@/db/schema";
// TODO: create a script to seed categories.
const categories = [
    "Shorts",
    "Gaming",
    "Coding",
    "Music",
    "Education",
    "Sports",
    "News",
    "Entertainment",
    "Lifestyle",
    "Science & Technology",
    "Travel",
    "Food",
    "Health & Fitness",
    "Beauty",
    "DIY & Crafts",
    "Comedy",
    "Animals",
    "History",
    "Nature"
];

async function main() {
    console.log("Seeding categories...");
    try {
        const values = categories.map((categoryName) => ({
            name: categoryName,
            description: `Videos related to ${categoryName.toLowerCase()}`
        }));
        await db.insert(categoriesSchema).values(values)
    } catch (error) {
        console.error("Error seeding categories", error);
        process.exit(1);
    }
}
main();