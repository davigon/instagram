import { IgApiClient } from "instagram-private-api"

export class SessionManager {
  public static serializeSession = async (
    client: IgApiClient
  ): Promise<string> => {
    const serializedClient = await client.state.serialize()
    delete serializedClient.constants
    return JSON.stringify(serializedClient)
  }

  public static deserializeSession = async (
    serializedClient: string
  ): Promise<IgApiClient> => {
    const client = new IgApiClient()
    await client.state.deserialize(serializedClient)
    return client
  }
}
