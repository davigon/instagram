import { Request, Response } from "express"
import { SessionManager } from "../utils/SessionManager"
import { IgApiClient } from "instagram-private-api"
import { LoginResponse } from "../../../types/types"

export class AuthController {
  public static login = async (req: Request, res: Response) => {
    try {
      const client = new IgApiClient()
      const { username, password } = req.body
      client.state.generateDevice(username)
      await client.account.login(username, password)
      const loginResponse: LoginResponse = {
        session: await SessionManager.serializeSession(client),
      }
      res.send(loginResponse)
    } catch (e) {
      res.sendStatus(400)
    }
  }

  public static logout = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      await client.account.logout()
      res.send({ message: "OK" })
    } catch (e) {
      res.sendStatus(400)
    }
  }
}
