import axios from "axios";
import crypto from 'crypto';
import { asanaClientID, asanaClientSecret, asanaRedirectURI } from "../config/index.js";

let oauthSession = {
    codeVerifier: null,
    state: null,
    token: null,
};

function base64URLEncode(str) {
    return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

const redirectToAsana = (req, res) => {
    const codeVerifier = base64URLEncode(crypto.randomBytes(32));
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    const state = base64URLEncode(crypto.randomBytes(16));

    oauthSession.codeVerifier = codeVerifier;
    oauthSession.state = state;

    const authUrl = `https://app.asana.com/-/oauth_authorize?` +
    `client_id=${asanaClientID}` +
    `&redirect_uri=${encodeURIComponent(asanaRedirectURI)}` +
    `&response_type=code` +
    `&state=${state}` +
    `&scope=default` +
    `&code_challenge_method=S256` +
    `&code_challenge=${codeChallenge}`;
    
    res.redirect(authUrl);
};

const handleOAuthCallback = async (req, res) => {
    const { code, state } = req.query;
    
    if (state !== oauthSession.state) {
        return res.status(403).send('Invalid state parameter. Potential CSRF attack.');
    }

    try {
        const response = await axios.post('https://app.asana.com/-/oauth_token', null, {
          params: {
            client_id: asanaClientID,
            client_secret: asanaClientSecret,
            grant_type: 'authorization_code',
            redirect_uri: asanaRedirectURI,
            code,
            code_verifier: oauthSession.codeVerifier,
          }
        });
    
        const accessToken = response.data.access_token;
        oauthSession.token = accessToken;
    
        console.log('Access Token:', accessToken);
        res.send('OAuth success with PKCE! You can now fetch tasks at /tasks');
    } catch (err) {
        console.error('OAuth Error:', err.response?.data || err.message);
        res.status(500).send('OAuth failed');
    }
}

const getAccessToken = () => oauthSession.token;

export {
    redirectToAsana,
    handleOAuthCallback,
    getAccessToken
};
  