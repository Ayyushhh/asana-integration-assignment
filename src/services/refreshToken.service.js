import axios from 'axios';
import { asanaClientID, asanaClientSecret } from '../config/index.js'

export const refreshAccessToken = async (req) => {
    try {
      const response = await axios.post('https://app.asana.com/-/oauth_token', null, {
        params: {
          grant_type: 'refresh_token',
          client_id: asanaClientID,
          client_secret: asanaClientSecret,
          refresh_token: req.session.refreshToken,
        }
      });
  
      req.session.accessToken = response.data.access_token;
      req.session.tokenExpiresAt = Date.now() + response.data.expires_in * 1000;
  
      return response.data.access_token;
    } catch (err) {
      console.error('Failed to refresh token:', err.response?.data || err.message);
      throw new Error('Unable to refresh token');
    }
};