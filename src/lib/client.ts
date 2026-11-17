/**
 * Content Island client (project «LAWYER PERSONAL SITE V1»).
 * Uses the READ-ONLY token from `.env` (CONTENT_ISLAND_ACCESS_TOKEN).
 * Only returns published content.
 */
import { createClient } from '@content-island/api-client';
import { CONTENT_ISLAND_ACCESS_TOKEN } from 'astro:env/server';

const client = createClient({ accessToken: CONTENT_ISLAND_ACCESS_TOKEN });

export default client;
