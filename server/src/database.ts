import * as mongodb from "mongodb";
import { Task } from "./task";

export const collections: {
    tasks?: mongodb.Collection<Task>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("pesdb");
    await applySchemaValidation(db);

    const tasksCollection = db.collection<Task>("tasks");
    collections.tasks = tasksCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "description", "status"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' is required and is a string",
                },
                description: {
                    bsonType: "string",
                    description: "'description' is required and is a string",
                    minLength: 20
                },
                status: {
                    bsonType: "string",
                    description: "'status' is required and is one of 'To Do', 'In Progress', or 'Done'",
                    enum: ["To Do","In Progress","Done"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "tasks",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("tasks", {validator: jsonSchema});
        }
    });
}
