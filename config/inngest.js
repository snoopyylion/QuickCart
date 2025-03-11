import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pelz-next" });

// Inngest function to save userdata to database
export const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk'},
    { event: 'clerk/user.created'},
async ({event}) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
        _id : id,
        email: email_addresses[0].email_address,
        name: first_name + " " + last_name,
        imageUrl: image_url
    };
    // Move database imports inside the function
    const connectDB = (await import("./db")).default;
    const User = (await import("@/models/User")).default;

    await connectDB();
    await User.create(userData);
}
)

/// Inngest function to update userdata in database

export const syncUserUpdate = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: image_url
        }

        // Move database imports inside the function
        const connectDB = (await import("./db")).default;
        const User = (await import("@/models/User")).default;

        await connectDB();
        await User.findByIdAndUpdate( id , userData);
    }
)

//Inngest function to delete userdata from database

export const syncUserDelete = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {

        const { id } = event.data;

        // Move database imports inside the function
        const connectDB = (await import("./db")).default;
        const User = (await import("@/models/User")).default;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)
