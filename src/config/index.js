import dotenv from 'dotenv';
dotenv.config();

const asanaClientID = process.env.ASANA_CLIENT_ID;
const asanaClientSecret = process.env.ASANA_CLIENT_SECRET;
const asanaRedirectURI = process.env.ASANA_REDIRECT_URI;
const asanaAccessToken = process.env.ASANA_ACCESS_TOKEN;

export {
    asanaClientID,
    asanaClientSecret,
    asanaRedirectURI,
    asanaAccessToken
}