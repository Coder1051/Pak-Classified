// const { urlencoded } = require('express');
const PostAd = require('../models/postAd');

class postAdController {
    controller() {

    }

    async getAll(req, res) {
        try {
            const getAll = await PostAd.find().populate("User");
            if (!getAll === 0) return res.status(400).json({ message: "Data not Found!", Status: 400 });
            return res.status(200).json(getAll);
        } catch (err) {
            return res.status(500).json({ message: 'Server Error', Status: 500 });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const getById = await PostAd.findById(id).populate("User");
            if (!id) return res.status(400).json({ message: ` Given ID:${id} not Found!`, Status: 400 });
            return res.status(200).json(getById);
        } catch (err) {
            // return res.status(500).json({message:'Server Error', Status: 500 });
            return res.status(500).json({ message: `Server Error`, Status: 500 });
        }
    }

    async Create(req, res) {
        try {
            console.log("Request Body:", req.body);
            const { Name, Image, Description, Features, Price, StartOn, EndOn, Category, CityArea, Type,OwnerName,OwnerContact } = req.body;
            // Validate required fields
            if (!Name || !Image || !Description || !Features || !Price || !Category || !CityArea || !Type || !OwnerName || !OwnerContact ) {
                return res.status(400).json({ message: 'Complete Data is required', Status: 400 });
            }
            const Created = await PostAd.create({ Name, Image, Description, Features, Price, StartOn, EndOn, Category, CityArea, Type,OwnerName,OwnerContact });
            if (!Created) {
                return res.status(400).json({ message: 'Failed to create Post', Status: 400 });
            }
            res.header("location", `${req.originalUrl}/${Created._id}`);
            return res.status(201).json(Created);
        } catch (err) {
            console.error("Server Error:", err.message);
            return res.status(500).json({ message: err.message, Status: 500 });
        }
    }


    async Update(req, res) {
        try {
            const id = req.params.id;
            const { Name, Image, Description, Features, Price, StartOn, EndOn, Category, CityArea, Type,OwnerName,OwnerContact } = req.body;
            const Updated = await PostAd.findByIdAndUpdate(id, { Name, Image, Description, Features, Price, StartOn, EndOn, Category, CityArea, Type,OwnerName,OwnerContact }, { new: true })
            if (!Updated) return res.status(400).json({ message: ` Given ID:${id} not Updated!`, Status: 400 });
            return res.status(200).json(Updated);
        } catch (err) {
            return res.status(500).json({ message: 'Server Error', Status: 500 });
        }
    }

    async Delete(req, res) {
        try {
            const id = req.params.id;
            const Deleted = await PostAd.findByIdAndDelete(id);
            if (!id) return res.status(400).json({ message: ` Given ID:${id} not Found!`, Status: 400 });
            return res.status(200).json(Deleted);
        } catch (err) {
            return res.status(500).json({ message: 'Server Error', Status: 500 });
        }
    }
}

const PostAdController = new postAdController();
module.exports = PostAdController