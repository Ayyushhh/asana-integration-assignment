import express from 'express';
import { getTasks, getWorkspaces } from '../controllers/task.controller.js';

const router = express.Router();

router.get('/', getTasks);
router.get('/workspaces', getWorkspaces);

export default router;