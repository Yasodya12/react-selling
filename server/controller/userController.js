import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import { verifyToken } from '../utils/verifyUser.js';
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.json({
        message: 'Server route is working!',
    });
};
export const updateUser = async (req, res, next) => {
    console.log("awa update");

    try {


        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },

            // to get updated listing
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        console.log("catch una")
        next(errorHandler(401, 'Something Went Wrong'));
    }
};

export const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};


export const getUserListings = async (req, res, next) => {
        console.log("awa lisgnggg");
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }

};

export const getUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) return next(errorHandler(404, 'User not found!'));

        const { password: pass, ...rest } = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
