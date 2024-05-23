import * as mongodb from "mongodb";

export interface Task {
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Done";
    _id?: mongodb.ObjectId;
}
