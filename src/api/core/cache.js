/**
 * Cache
 * src/core/cache
 * @see https://github.com/rv-kip/express-redis-cache
 */

import Cache from 'express-redis-cache';
import redisClient from '../db/redis';

const cache = Cache({ client: redisClient, prefix: 'boldr' });

export default cache;
