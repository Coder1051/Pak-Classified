const RolesController = require('../controllers/roles.cont')
const { Router } = require('express')
const RolesRouter = Router()

RolesRouter.route('/')
    .get(RolesController.getAll)
    .post(RolesController.create)
RolesRouter.route('./:id')
    .get(RolesController.getById)
    .put(RolesController.update)
    .delete(RolesController.delete)
module.exports = RolesRouter