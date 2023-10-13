import JWT from "jsonwebtoken";

export const ProtectedRoute = async ( req, res, next ) =>
{
    try
    {
        const decode = JWT.verify( req.header.auth, process.env.JWT );
        req.user = decode;
        next();
    } catch ( error )
    {
        console.log( error );
    }
};