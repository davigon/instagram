import { Request, Response } from "express"
import { SessionManager } from "../utils/SessionManager"
import {
  IgApiClient,
  IgLoginTwoFactorRequiredError,
} from "instagram-private-api"
import {
  LoginResponse,
  TwoFactorLoginResponse,
  TwoFactorLoginType,
} from "../../../types/types"
import { LoginRequest } from "../../client/hooks/useAuth"

export class AuthController {
  public static login = async (
    req: Request<{}, {}, LoginRequest>,
    res: Response
  ) => {
    try {
      const client = new IgApiClient()
      console.log("app version: " + client.state.constants.APP_VERSION)

      const { username, password, twoFactor } = req.body
      client.state.generateDevice(username)

      await client.simulate.preLoginFlow()
      if (!twoFactor) await client.account.login(username, password)
      else
        await client.account.twoFactorLogin({
          username,
          verificationCode: twoFactor.code,
          twoFactorIdentifier: twoFactor.identifier,
          verificationMethod: String(twoFactor.type),
          trustThisDevice: "0",
        })

      const loginResponse: LoginResponse = {
        session: await SessionManager.serializeSession(client),
      }
      res.send(loginResponse)
    } catch (e) {
      if (e instanceof IgLoginTwoFactorRequiredError) {
        const twoFactorLoginResponse: TwoFactorLoginResponse = {
          type: e.response.body.two_factor_info.totp_two_factor_on
            ? TwoFactorLoginType.TOTP
            : TwoFactorLoginType.SMS,
          identifier: e.response.body.two_factor_info.two_factor_identifier,
        }
        const loginResponse: LoginResponse = {
          session: "",
          twoFactor: twoFactorLoginResponse,
        }
        res.send(loginResponse)
      } else {
        res.sendStatus(400)
      }
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
