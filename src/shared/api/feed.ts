import api from '@/shared/api/axios';
import type { Post } from '@/entities/post/model/post';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

type ApiUser = {
  name?: string;
  profileImageUrl?: string;
};

export interface ApiFeed {
  id: number;
  taskMessage: string;
  content: string;
  profileImageUrl: string | null;
  hearts: number;
  isPublic: boolean;
  isPostLiked: boolean;
  isPostHearted: boolean;
  likes: number;
  createdAt: string;
  user: {
    profileImageUrl: string;
    name: string;
  };
}

type FeedEnvelope =
  | { result?: { feeds?: ApiFeed[] } }
  | { feeds?: ApiFeed[] }
  | ApiFeed[];

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const hasFeeds = (v: unknown): v is { feeds: ApiFeed[] } => {
  if (!isObject(v)) return false;
  const feeds = (v as Record<string, unknown>).feeds;
  return Array.isArray(feeds);
};

const hasResultFeeds = (v: unknown): v is { result: { feeds: ApiFeed[] } } => {
  if (!isObject(v)) return false;
  const result = (v as Record<string, unknown>).result;
  if (!isObject(result)) return false;
  const feeds = (result as Record<string, unknown>).feeds;
  return Array.isArray(feeds);
};

const isApiFeedArray = (v: unknown): v is ApiFeed[] => Array.isArray(v);

function pickList(d: FeedEnvelope): ApiFeed[] {
  if (isApiFeedArray(d)) return d;
  if (hasFeeds(d)) return d.feeds;
  if (hasResultFeeds(d)) return d.result.feeds;
  return [];
}

/** 피드 목록 */
export async function fetchFeeds(): Promise<Post[]> {
  const { data } = await api.get('/feed');
  return data.feeds;
}

/** 피드 검색 */
export async function searchFeeds(q: string): Promise<Post[]> {
  const { data } = await api.get('/feed/search', {
    params: { q },
  });
  return data.feeds;
}

/** 리액션 (좋아요 등) */
export async function reactFeed(id: number | string, type: 'LIKE' | 'HEART') {
  await api.patch(`/feed/${id}/reaction`, {
    reactionType: type,
  });
}
