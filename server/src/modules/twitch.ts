import { ApiClient } from 'twitch';
import { StaticAuthProvider } from 'twitch-auth';
import axios from 'axios';

const getAccessToken = async () => {
  const res = await axios.post('https://id.twitch.tv/oauth2/token', {}, {
    params: {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: process.env.TWITCH_GRANT_TYPE
    }
  })

  return res.data;
}

const getApiClient = async () => {
  const authProvider = new StaticAuthProvider(process.env.TWITCH_CLIENT_ID, await getAccessToken());
  const apiClient = new ApiClient({ authProvider });

  return apiClient;
}

export default getApiClient();
