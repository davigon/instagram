import { Router } from "express"
import { UserController } from "../controllers/UserController"

const router = Router()

router.get("/", UserController.user)

router.get("/currentUser", UserController.currentUser)

export default router
