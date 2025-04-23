import axios from 'axios';
import { getAccessToken } from './oauth.controller.js';

const getTasks = async (req, res) => {
  try {
    const token = getAccessToken();
    if (!token) return res.status(401).json({ error: 'Not authenticated. Go to /oauth/authorize' });

    const response = await axios.get('https://app.asana.com/api/1.0/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        assignee: 'me',
        workspace: '1210055946840286',
        completed_since: 'now',
        opt_fields: 'name,completed,due_on'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const getWorkspaces = async (req, res) => {
    try {
      const token = getAccessToken();
      const response = await axios.get('https://app.asana.com/api/1.0/workspaces', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      res.json(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch workspaces' });
    }
};

export { 
    getTasks, getWorkspaces 
};
