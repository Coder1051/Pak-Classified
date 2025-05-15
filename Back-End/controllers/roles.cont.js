const roles = require('../models/roles'); // Ensure this path is correct

class RolesController {
    async getAll(req, res) {
        try {
            const roles = await roles.find();
            return res.status(200).json(roles);
        } catch (error) {
            return res.status(500).json({ message: "Server Error", status: 500 });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const role = await roles.findById(id);
            if (!role) {
                return res.status(404).json({ message: "Role not found", status: 404 });
            }
            return res.status(200).json(role);
        } catch (error) {
            return res.status(500).json({ message: "Server Error", status: 500 });
        }
    }

    async create(req, res) {
        try {
            const { Name, Rank } = req.body;
            if (!Name || !Rank) {
                return res.status(400).json({ message: 'Both Name and Rank are required', status: 400 });
            }
            const created = await roles.create({ Name, Rank });
            res.header("Location", `${req.originalUrl}/${created._id}`);
            return res.status(201).json(created);
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Server Error", status: 500 });
        }
    }

    async update(req, res) {
        try {
            const { Name, Rank } = req.body;
            const { id } = req.params;
            const updated = await roles.findByIdAndUpdate(id, { Name, Rank }, { new: true });
            if (!updated) {
                return res.status(400).json({ message: `Role with ID ${id} not updated`, status: 400 });
            }
            return res.status(200).json(updated);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server Error", status: 500 });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await roles.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ message: `Role with ID ${id} not found`, status: 404 });
            }
            return res.status(200).json(deleted);
        } catch (error) {
            return res.status(500).json({ message: "Server Error", status: 500 });
        }
    }
}

module.exports = new RolesController();
