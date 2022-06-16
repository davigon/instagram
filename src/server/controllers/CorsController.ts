import { Request, Response } from "express"
const corsAnywhere = require("cors-anywhere")

export class CorsController {
  private static proxyServer = corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeaders: [], // Do not require any headers.
    removeHeaders: [], // Do not remove any headers.
  })

  public static cors = async (req: Request, res: Response) => {
    req.url = req.url.replace("/api/cors/", "/")
    CorsController.proxyServer.emit("request", req, res)
  }
}
