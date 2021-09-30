import {Router} from "express";
import UserController from "../controllers/UserController";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";

const router = Router();

// User Listing
router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.index);

// User Create
router.post('/', [checkJwt, checkRole(['ADMIN'])], UserController.store);

// User Detail
router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], UserController.show);

// User Update
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], UserController.update);

// User Delete
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], UserController.delete);

export default router;