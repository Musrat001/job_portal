
import app from "./app.js";
import connectDb from "./db.js";

const connectingServer = (async () => {

    try {
        const dbHost = await connectDb();
        app.listen(process.env.PORT, () => {
            console.log(`Your Server is running on port ${process.env.PORT}`);

        })
    } catch (error) {

    }


})();