import express from 'express';
import { redirectToAsana, handleOAuthCallback } from '../controllers/oauth.controller.js';

const router = express.Router();

router.get('/authorize', redirectToAsana);
router.get('/callback', handleOAuthCallback);

export default router;