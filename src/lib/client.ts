/**
 * Cliente de Content Island (proyecto «LAWYER PERSONAL SITE V1»).
 * Usa el token de SOLO LECTURA de `.env` (CONTENT_ISLAND_ACCESS_TOKEN).
 * Solo devuelve contenido publicado.
 */
import { createClient } from '@content-island/api-client';
import { CONTENT_ISLAND_ACCESS_TOKEN } from 'astro:env/server';

const client = createClient({ accessToken: CONTENT_ISLAND_ACCESS_TOKEN });

export default client;
