import dotenv from 'dotenv';
dotenv.config();

const asanaClientID = process.env.ASANA_CLIENT_ID;
const asanaClientSecret = process.env.ASANA_CLIENT_SECRET;
const asanaRedirectURI = process.env.ASANA_REDIRECT_URI;

export {
    asanaClientID,
    asanaClientSecret,
    asanaRedirectURI
}