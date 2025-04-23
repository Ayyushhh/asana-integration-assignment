import axios from 'axios';
import logger from '../utils/logger.js';

export const registerWebhook = async (accessToken, projectGid, callbackUrl, workspaceGid) => {
  try {
    // Step 1: Get existing webhooks for the workspace
    const response = await axios.get(`https://app.asana.com/api/1.0/webhooks?workspace=${workspaceGid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const existingWebhooks = response.data?.data || [];

    const alreadyRegistered = existingWebhooks.find(
      (webhook) => webhook.resource.gid === projectGid && webhook.target === callbackUrl
    );

    if (alreadyRegistered) {
      logger.info(`[Asana Webhook] Already exists for project ${projectGid} and URL ${callbackUrl}`);
      return;
    }

    // Step 2: Register new webhook
    const createResponse = await axios.post('https://app.asana.com/api/1.0/webhooks', {
      data: {
        resource: projectGid,
        target: callbackUrl,
      },
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    logger.info(`[Asana Webhook] Successfully registered: ${JSON.stringify(createResponse.data)}`);
  } catch (error) {
    logger.error('[Asana Webhook] Registration failed:', error.response?.data || error.message);
    throw error;
  }
};
