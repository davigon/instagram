import { Router } from "express"
import { StoriesController } from "../controllers/StoriesController"

const router = Router()

router.get("/highlightsTray", StoriesController.highlightsTray)

router.get("/storiesTray", StoriesController.storiesTray)

router.get("/stories", StoriesController.stories)

export default router
