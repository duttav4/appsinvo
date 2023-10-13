import mongoose from "mongoose";

const mongoDb = async () =>
{
    try
    {
        const con = await mongoose.connect( process.env.MONGO );
        console.log( `Connected to mongo ${con.connection.host}` );
    } catch ( error )
    {
        console.log( error );
    }
};

export default mongoDb
