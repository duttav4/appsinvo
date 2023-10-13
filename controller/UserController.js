import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import haversine from 'haversine-distance';

export const createUser = async ( req, res ) =>
{
    const { name, email, password, address, lat, long, status } = req.body;

    const existingUser = await UserModel.findOne( { email } );
    if ( existingUser )
    {
        return res.status( 200 ).send( {
            success: false,
            message: "User Alredy Registered"
        } );
    }

    /* create hash password  */
    const saltOrRounds = 10;
    const hashedPassword = bcrypt.hashSync( password, saltOrRounds );

    const user = await UserModel( { name, email, password: hashedPassword, address, latitude: lat, longitude: long, status } ).save();

    res.status( 200 ).send( {
        success: true,
        message: "User Registered Successfully",
        user
    } );
};

export const getAllUser = async ( req, res ) =>
{
    const users = await UserModel.find( {} );
    res.send( {
        status: 200,
        users
    } );
};

export const getDistance = async ( req, res ) =>
{
    const id = req.params.id;
    const latitude = req.query.lat;
    const longitude = req.query.long;
    const second = { latitude, longitude };
    const user = await UserModel.findById( id );
    const first = { latitude: user.latitude, longitude: user.longitude };

    const distance = haversine( first, second );
    res.send( {
        status: 200,
        distance
    } );
};

export const weeklyUser = async ( req, res ) =>
{
    const users = await UserModel.aggregate( [
        {
            $match: {
                "createdAt": {
                    $exists: true
                }
            }
        },
        {
            $group: {
                _id: {
                    dayOfWeek: {
                        $dayOfWeek: "$createdAt"
                    }
                },
                data: {
                    $push: "$$ROOT"
                }
            }
        }
    ] );

    res.send( {
        success: 200,
        users
    } );
};