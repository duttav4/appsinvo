import express, { json } from "express";
import cors from "cors";
import userRouter from "./router/UserRouter.js";
import dotenv from "dotenv";
import mongoDb from "./db/db.js";

dotenv.config();

const app = express();
const port = 8100;

mongoDb();

app.use( express.json() );
app.use( cors() );

app.use( "/api/user", userRouter );

app.use( '/', ( req, res ) =>
{
    res.send( {
        message: "welcome"
    } );
} );

app.listen( port, () =>
{
    console.log( `server running on port ${port}` );
} );
