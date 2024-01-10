import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import { verifyToken } from '../utils/verifyUser.js';

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
