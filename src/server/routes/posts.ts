import { Router } from "express"
import { PostsController } from "../controllers/PostsController"

const router = Router()

router.get("/home", PostsController.homePosts)

router.get("/user", PostsController.userPosts)

export default router
