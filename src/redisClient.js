import { createClient } from 'redis';

// Load environment variables
const PORT = process.env.PORT || "3000";
const REDIS_PWD = process.env.REDIS_PWD || "kkG3Qu0cIlH7lonfSYX4gqi4BCb9kURS";
const REDIS_HOST = process.env.REDIS_HOST || "redis-14897.c273.us-east-1-2.ec2.redns.redis-cloud.com";
const REDIS_PORT = parseInt(process.env.REDIS_PORT || "14897", 10);

let client;

if (!client) {
    client = createClient({
        password: REDIS_PWD, // Use the password from environment variables
        socket: {
            host: REDIS_HOST, // Use the host from environment variables
            port: REDIS_PORT // Use the port from environment variables
        }
    });

    // Check if already connecting or connected
    if (!client.isOpen) {
        client.connect()
            .then(() => console.log("Connected to Redis"))
            .catch((err) => console.error("Error connecting to Redis:", err));
    }
}

// Handle Redis disconnection on app shutdown
process.on('SIGINT', async () => {
    try {
        if (client.isOpen) {
            await client.disconnect();
            console.log("Redis client disconnected");
        }
        process.exit(0);
    } catch (err) {
        console.error("Error during Redis disconnection:", err);
        process.exit(1);
    }
});

process.on('SIGTERM', async () => {
    try {
        if (client.isOpen) {
            await client.disconnect();
            console.log("Redis client disconnected");
        }
        process.exit(0);
    } catch (err) {
        console.error("Error during Redis disconnection:", err);
        process.exit(1);
    }
});

export default client;
