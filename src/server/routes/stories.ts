import { Router } from "express"
import { StoriesController } from "../controllers/StoriesController"

const router = Router()

router.get("/highlightsTray", StoriesController.highlightsTray)

router.get("/storiesTray", StoriesController.storiesTray)

export default router
