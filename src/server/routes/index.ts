import { Router } from "express"
import auth from "./auth"
import cors from "./cors"
import user from "./user"
import search from "./search"
import stories from "./stories"

const router = Router()

router.use("/auth", auth)

router.use("/cors", cors)

router.use("/user", user)

router.use("/search", search)

router.use("/stories", stories)

export default router
