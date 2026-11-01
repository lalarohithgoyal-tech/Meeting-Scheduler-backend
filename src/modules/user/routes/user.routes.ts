import { Router } from "express";
import {
  createUserController,
  getUserController
} from "../index/user.controller";
import validateDto from "../../../middlewares/validate";
import { CreateUserDto } from "../dto/create-user.dto";

const router = Router();

router.post("/", validateDto(CreateUserDto), createUserController);
router.get("/:id", getUserController);

export default router;