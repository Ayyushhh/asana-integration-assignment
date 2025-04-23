import axios from 'axios';
import { refreshAccessToken } from '../services/refreshToken.service.js';
import logger from '../utils/logger.js';
import { asanaWorkspaceGID } from '../config/index.js';


const getTasks = async (req, res) => {
  try {
    const token = req.session.accessToken;
    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    if (Date.now() >= req.session.tokenExpiresAt) {
        token = await refreshAccessToken(req);
    }

    const response = await axios.get('https://app.asana.com/api/1.0/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        assignee: 'me',
        workspace: asanaWorkspaceGID,
        completed_since: 'now',
        opt_fields: 'name,completed,due_on'
      }
    });

    logger.info('Successfully fetched tasks from Asana');
    res.json(response.data);
  } catch (err) {
    logger.error(`Failed to fetch tasks: ${err.response?.data || err.message}`);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export { 
    getTasks 
};

