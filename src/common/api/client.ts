/**
 * Content Island client (project «LAWYER PERSONAL SITE V1»).
 * Uses the READ-ONLY token from `.env` (CONTENT_ISLAND_ACCESS_TOKEN). Only returns published content.
 *
 * Shared fetch wrapper for every pod API: each pod declares its own queries and API models,
 * and identical queries are fetched once per build (several pods read the same singletons: Settings, UiText…).
 * In development there is no cache, so Content Island changes show up on reload.
 */
import { createClient, type ContentListQueryParams, type ContentQueryParams, type Model } from '@content-island/api-client';
import { CONTENT_ISLAND_ACCESS_TOKEN } from 'astro:env/server';
import { createAsyncCache } from '@common/helpers';

const client = createClient({ accessToken: CONTENT_ISLAND_ACCESS_TOKEN });
const cached = createAsyncCache(!import.meta.env.DEV);

export const getContent = <M extends Model>(query: ContentQueryParams<M>): Promise<M> =>
  cached(`content:${JSON.stringify(query)}`, () => client.getContent<M>(query));

export const getContentList = <M extends Model>(query: ContentListQueryParams<M>): Promise<M[]> =>
  cached(`list:${JSON.stringify(query)}`, () => client.getContentList<M>(query));

export const getProject = () => client.getProject();
