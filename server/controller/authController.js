import User from '../models/user.model.js'

export const signup = async (req, res, next) => {

    console.log(req.body);
    const { username, email, password } = req.body;

    const newUser = new User({ username, email,password  });

    try {
        await newUser.save();
        res.status(201).json('User created Sucefully')
    }catch (error) {
        // res.status(500).json(error);
        next(error);
    }

    // const hashedPassword = bcryptjs.hashSync(password, 10);
    // const newUser = new User({ username, email, password: hashedPassword });
    // try {
    //     await newUser.save();
    //     res.status(201).json('User created successfully!');
    // } catch (error) {
    //     next(error);
    // }
};