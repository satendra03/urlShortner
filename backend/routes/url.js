import express from 'express';
import { analyzeUrl, generateShortUrl, redirectToOriginalUrl } from '../controllers/url.js';

export const router = express.Router();

router.post('/', generateShortUrl);

router.get('/:shortId', redirectToOriginalUrl);

router.get('/analyze/:shortId', analyzeUrl);