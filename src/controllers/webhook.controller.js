import crypto from 'crypto';
import logger from '../utils/logger.js';

let storedXHookSecret = null;

const receiveAsanaWebhook = (req, res) => {
    const incomingSecret = req.headers['x-hook-secret'];
    const incomingSignature = req.headers['x-hook-signature'];
    

    if (incomingSecret && !storedXHookSecret) {
        storedXHookSecret = incomingSecret;
        res.setHeader('X-Hook-Secret', storedXHookSecret);
        logger.info('✅ Stored new X-Hook-Secret from Asana');
        return res.sendStatus(200);
    }

    if (incomingSignature && storedXHookSecret) {
        const computedSignature = crypto
            .createHmac('sha256', storedXHookSecret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        
        const isValid = crypto.timingSafeEqual(
            Buffer.from(incomingSignature),
            Buffer.from(computedSignature)
        );

        if (!isValid) {
            logger.warn('❌ Invalid webhook signature');
            return res.sendStatus(401); 
        }

        const events = req.body.events || [];
        logger.info(`📥 Received ${events.length} event(s) from Asana:`);
        
        events.forEach((event, index) => {
            const resourceGID = typeof event.resource === 'object' ? event.resource.gid : event.resource;
            const resourceType = typeof event.resource === 'object' ? event.resource.resource_type : 'unknown';
        
            logger.info(
              `${index + 1}. Resource ${resourceGID} (${resourceType}) - Action: ${event.action}`
            );
        });
      
        return res.sendStatus(200);
    }else{
        logger.error('❌ Webhook request not recognized');
        return res.sendStatus(400);
    }
};

export { receiveAsanaWebhook };
