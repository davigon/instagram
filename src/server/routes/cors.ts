import { Router } from "express"
import { CorsController } from "../controllers/CorsController"

const router = Router()

router.get("/:url*", CorsController.cors)

export default router
