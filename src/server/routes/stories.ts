import { Router } from "express"
import { StoriesController } from "../controllers/StoriesController"

const router = Router()

router.get("/highlightsTray", StoriesController.highlightsTray)

export default router
