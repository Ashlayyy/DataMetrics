import { slowDown, SlowDownRequestHandler } from 'express-slow-down';
import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';
import config from '../config/Config';

const slower: SlowDownRequestHandler = slowDown({
  windowMs: config.request.slowDown.window,
  delayAfter: config.request.slowDown.delayAfter,
  delayMs: () => config.request.slowDown.delayMs
});

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: config.request.rateLimit.window,
  max: config.request.rateLimit.max
});

export { slower, limiter };
