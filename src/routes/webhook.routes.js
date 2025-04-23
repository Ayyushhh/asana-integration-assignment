import express from 'express';
import { receiveAsanaWebhook } from '../controllers/webhook.controller.js';

const router = express.Router();

router.post('/asana', receiveAsanaWebhook);

export default router;