import { Router } from "express"
import auth from "./auth"
import cors from "./cors"
import user from "./user"

const router = Router()

router.use("/auth", auth)

router.use("/cors", cors)

router.use("/user", user)

export default router
