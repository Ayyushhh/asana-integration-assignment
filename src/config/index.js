import dotenv from 'dotenv';
dotenv.config();

const asanaClientID = process.env.ASANA_CLIENT_ID;
const asanaClientSecret = process.env.ASANA_CLIENT_SECRET;
const asanaRedirectURI = process.env.ASANA_REDIRECT_URI;
const asanaProjectGID = process.env.ASANA_PROJECT_GID;
const asanaWorkspaceGID = process.env.ASANA_WORKSPACE_GID;

export {
    asanaClientID,
    asanaClientSecret,
    asanaRedirectURI,
    asanaProjectGID,
    asanaWorkspaceGID
}