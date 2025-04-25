const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = require('../models/roles');
const upload = require('../middleware/multer')

class userController {
    constructor() {

    }
    async getAll(req, res) {
        try {
            const getAll = await User.find().populate("role");
            if (getAll === 0) return res.status(400).json({ message: `User not found!`, status: 400 })
            return res.status(200).json(getAll)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: `Server Error`, })
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const getById = await User.findById(id).populate("role");
            if (!getById) return res.status(400).json({ message: `Given Id:${id} Not Found!`, Status: 400 });
            return res.status(201).json(getById);
        } catch (err) {
            return res.status(500).json({ message: `Server Error`, status: 500 });
        }
    }

    //for path Image 
    // async Create(req, res) {
    //     try {
    //         const {
    //             name,
    //             email,
    //             password,
    //             contact,
    //             dateOfbirth,
    //             SecurityAnswer,
    //             securityQuestion
    //         } = req.body;
    
    //         const imagePath = req.file ? req.file.path : null;
    
    //         // 🧠 Check required fields
    //         if (!name || !email || !password || !contact || !dateOfbirth || !SecurityAnswer || !securityQuestion || !imagePath) {
    //             return res.status(400).json({ message: `Provide Complete Data Please`, status: 400 });
    //         }
    
    //         // 🔐 Hash password
    //         const passwordHash = await bcrypt.hash(password, 10);
    
    //         // 🎭 Assign default role if not provided
    //         let assignedRole = req.body.role;
    //         if (!assignedRole) {
    //             const guest = await roles.findOne({ Name: "Guest" });
    //             assignedRole = guest ? guest._id : null;
    //         }
    
    //         // 🎯 Build user object
    //         const newUser = {
    //             name,
    //             email,
    //             image: imagePath,
    //             password: passwordHash,
    //             contact: Number(contact),
    //             dateOfbirth,
    //             SecurityAnswer,
    //             securityQuestion,
    //             role: assignedRole
    //         };
    
    //         // 🧾 Save user
    //         const created = await User.create(newUser);
    //         if (!created) return res.status(400).json({ message: `User not created`, status: 400 });
    
    //         res.header("Location", `${req.originalUrl}/${created._id}`);
    //         return res.status(201).json(created);
    
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: `Server Error`, status: 500 });
    //     }
    // }
    // for URL IMg
    async Create(req, res) {
        try {
            const {
                name,
                email,
                password,
                contact,
                dateOfbirth,
                SecurityAnswer,
                securityQuestion,
                image // 👈 now using image from body
            } = req.body;
    
            // 🧠 Check required fields
            if (!name || !email || !password || !contact || !dateOfbirth || !SecurityAnswer || !securityQuestion || !image) {
                return res.status(400).json({ message: `Provide Complete Data Please`, status: 400 });
            }
    
            // 🔐 Hash password
            const passwordHash = await bcrypt.hash(password, 10);
    
            // 🎭 Assign default role if not provided
            let assignedRole = req.body.role;
            if (!assignedRole) {
                const guest = await roles.findOne({ Name: "Guest" });
                assignedRole = guest ? guest._id : null;
            }
    
            // 🎯 Build user object
            const newUser = {
                name,
                email,
                image, // 👈 directly using image URL
                password: passwordHash,
                contact: Number(contact),
                dateOfbirth,
                SecurityAnswer,
                securityQuestion,
                role: assignedRole
            };
    
            // 🧾 Save user
            const created = await User.create(newUser);
            if (!created) return res.status(400).json({ message: `User not created`, status: 400 });
    
            res.header("Location", `${req.originalUrl}/${created._id}`);
            return res.status(201).json(created);
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Server Error`, status: 500 });
        }
    }
    

    async Update(req, res) {
        try {
            const id = req.params.id;
            const { name, email, password, contact, dateOfbirth, SecurityAnswer, securityQuestion, role, image } = req.body;
            const Updated = await User.findByIdAndUpdate(id, { name, email, image, password, contact, dateOfbirth, SecurityAnswer, securityQuestion, role }, { new: true })
            if (!Updated) return res.status(400).json({ message: `Your Users Data is not found!`, status: 400 })
            return res.status(200).json(Updated)
        } catch (err) {
            return res.status(500).json({ message: `Server Error`, status: 500 })
        }
    }

    async Delete(req, res) {
        try {
            const id = req.params.id;
            const Deleted = await User.findByIdAndDelete(id)
            if (!Deleted) return res.status(400).json({ message: `Your User is not Found!`, status: 400 })
            return res.status(200).json(Deleted);
        } catch (err) {
            return res.status(500).json({ message: `Server Error`, status: 500 })
        }
    }

    async Login(req, res) {
        try {

            const currentUser = await User.findOne({ email: req.body.email })
            console.log(currentUser)
            if (currentUser) {
                console.log(req.body.password);
                console.log(currentUser.password);
                if (await bcrypt.compare(req.body.password, currentUser.password)) {
                    const key = process.env.JWT_SECRET_KEY;
                    const payload = {
                        _id: currentUser._id,
                        email: currentUser.email,
                        name: currentUser.name
                    }
                    const Time = Number(process.env.JWT_TOKEN_EXPIRES_IN); //ye Time ki limitation ko hatany k liye comment kiya ha
                    // const Time = Number(process.env.EXPIRES_IN); //ye ghalt ha
                    const token = await jwt.sign(
                        payload,   //data as a preload
                        key,     //secret key of encrytion
                        // { expiresIn: Time }  // Expiry Time Of Token
                    )
                    res.header(process.env.JWT_TOKEN_HEADER,  //Auth Header Name
                        token //Header value
                    );
                    return res.status(200).json(currentUser)
                }
            }
            return res.status(400).json({ message: `Current User Not Found!`, Status: 400 })
        } catch (err) {
            console.error(err);

            return res.status(500).json({ message: `Server Error`, status: 500 })
        }
    }
}
module.exports = new userController