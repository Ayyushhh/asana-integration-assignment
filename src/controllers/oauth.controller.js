import axios from "axios";
import crypto from 'crypto';
import logger from '../utils/logger.js';
import { asanaClientID, asanaClientSecret, asanaRedirectURI } from "../config/index.js";


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

    req.session.codeVerifier = codeVerifier;
    req.session.state = state;

    logger.info('Initiating OAuth flow with PKCE');

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
    
    if (!req.session.state || state !== req.session.state) {
        logger.warn('Invalid state parameter detected. Potential CSRF attack.');
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
            code_verifier: req.session.codeVerifier,
          }
        });

        const { access_token, refresh_token, expires_in } = response.data;
        
        req.session.accessToken = access_token;
        req.session.refreshToken = refresh_token;
        req.session.tokenExpiresAt = Date.now() + expires_in * 1000;

        logger.info('Successfully obtained access token');
        res.send('OAuth success with PKCE! You can now fetch tasks at /tasks');
    } catch (err) {
        logger.error(`OAuth failed: ${err.message}`);
        res.status(500).send('OAuth failed');
    }
}

export {
    redirectToAsana,
    handleOAuthCallback
};
  