const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const { setUser } = require('../helpers/jwt.helper');
const sendMail = require('../helpers/mail.helper');
const crypto = require('crypto');

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        throw new Error("Not valid Google Login");
    }
}



const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, verified: true });
        if (!user) {
            return res.status(400).json({ status: false, message: 'Invalid email or password.' });
        }

        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: 'Invalid email or password.' });
        }

        const token = setUser(user);
        const rec_email = user.email;
        const mailStatus = await sendMail('IMP: You Logged In as User on new Device', rec_email,
            `IMP Just wanted to let you know that your account has been loggedIn in a new device`);

        res.status(200).json({ status: true, message: 'Login successful!', token, user });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array()[0].msg });
    }

    const { name, email, phone_number, password } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString(); s

    try {
        const existingUser = await User.findOne({ email, verified: true });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User already exists with this email.' });
        }

        const existingUser2 = await User.findOne({ phone_number, verified: true });
        if (existingUser2) {
            return res.status(400).json({ status: false, message: 'User already exists with this phone number.' });
        }

        let user;
        const newUser = await User.findOne({ email, verified: false });

        if (!newUser) {
            user = await User.create({ name, email, phone_number, password, otp });
        } else {
            newUser.phone_number = phone_number;
            newUser.otp = otp;
            newUser.password = password;
            await newUser.save();
            user = newUser;
        }

        const mailStatus = await sendMail('IMP: Your OTP Code', email, `Your OTP code is ${otp}`);
        if (mailStatus) {
            res.status(201).json({ status: true, message: 'Verification is Needed!', user });
        } else {
            res.status(500).json({ status: false, message: 'Failed to send OTP.' });
        }

    } catch (error) {
        //console.log(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

const google_login = async (req, res) => {
    const details = await verifyGoogleToken(req.body.token);
    const { email, name, sub: google_id } = details;
    const sanitized_name = name.replace(/[^a-zA-Z\s]/g, "").trim();
    try {
        let user = await User.findOne({ email });

        if (!user) {
            const randomPassword = Math.random().toString(36).slice(-8);
            const randomPhoneNumber = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
            user = await User.create({
                name: sanitized_name,
                email,
                google_id,
                phone_number: randomPhoneNumber,
                password: randomPassword,
                verified: true,
            });

            const welcomeMailStatus = await sendMail(
                "Imarticus Learning: You Logged In as User on new Device!",
                email,
                `Dear ${name},\n\nYour account has been successfully created via Google Login.\n\nLogin Details:\nEmail: ${email}\nTemporary Password: ${randomPassword}\n\nPlease change your password after login.`
            );
            if (!welcomeMailStatus) {
                console.error("Failed to send welcome email.");
            }
        } else {
            if (user.google_id && user.google_id !== google_id) {
                return res.status(400).json({ status: false, message: 'Invalid Google ID' });
            }
            user.google_id = google_id;
            await user.save();
        }

        user.otp = null;
        user.verified = true;
        await user.save();
        const token = setUser(user);
        const mailStatus = await sendMail(
            'Imarticus Learning: You Logged In as User on new Device',
            email,
            `Dear ${name},\n\nYour account has been logged in on a new device.\n\nIf this wasn't you, please contact our support team immediately.`
        );
        if (!mailStatus) {
            console.error("Failed to send login notification email.");
        }
        user.password = null;
        res.cookie('user_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 365
        });

        return res.status(200).json({ status: true, message: 'Login successful!', token, user });
    } catch (error) {
        console.error("Google Login Error:", error);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

const logOut = async (req, res) => {
    res.clearCookie('user_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });
    res.status(200).json({ status: true, message: "User logged out" });
};


const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array()[0].msg });
    }

    const { name, email, phone_number } = req.body;

    try {
        const userId = req.user.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { name, email, phone_number },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found.' });
        }

        res.status(200).json({ status: true, message: 'User details updated successfully!', user });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

const verifyOtp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array()[0].msg });
    }

    const { otp } = req.body;
    const { userid } = req.params;

    try {
        const user = await User.findOne({ _id: userid, otp, verified: false });
        if (!user) {
            return res.status(400).json({ status: false, message: 'Invalid OTP or user already verified.' });
        }

        await User.findByIdAndUpdate(user._id, { verified: true, otp: null });
        const mailStatus = await sendMail('IMP: Account Verified Successfully ✅', user.email, `Hello ${user.name}, Congratulations 🎉 your account is now verified and now you can start buying products.`);

        if (!mailStatus) {
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }

        const token = setUser(user);
        res.status(200).json({ status: true, message: 'Login successful!', token, user });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

const resendOtp = async (req, res) => {
    const { userid } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array()[0].msg });
    }
    try {
        const user = await User.findOne({ _id: userid, verified: false });
        if (!user) {
            return res.status(400).json({ status: false, message: 'User not found or already verified.' });
        }

        const newOtp = crypto.randomInt(100000, 999999).toString();
        await User.findByIdAndUpdate(user._id, { otp: newOtp });
        const mailStatus = await sendMail('IMP: Your new OTP Code', user.email, `Your new OTP code is ${newOtp}`);

        if (mailStatus) {
            res.status(200).json({ status: true, message: 'New OTP sent successfully!' });
        } else {
            res.status(500).json({ status: false, message: 'Failed to send OTP.' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password -otp -__v -verified");
        if (!user) res.status(500).json({ status: false, message: 'User Not Found' });
        return res.status(200).json({ status: true, user });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};



module.exports = {
    signup,
    login,
    updateUser,
    verifyOtp,
    resendOtp,
    getUser,
    google_login
};
