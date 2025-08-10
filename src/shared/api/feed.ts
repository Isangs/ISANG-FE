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

type ApiFeed = {
  id?: number;
  taskMessage?: string;
  content?: string;
  profileImageUrl?: string;
  hearts?: number;
  likes?: number;
  createdAt?: string;
  images?: string[];
  user?: ApiUser;
};

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

/** API → UI Post 매핑 */
export function toPost(x: ApiFeed): Post {
  const created = x.createdAt ? dayjs(x.createdAt) : null;

  // 프로필 이미지: user.profileImageUrl 우선, 없으면 루트 profileImageUrl, 마지막으로 기본값
  const profileUrl =
    x.user?.profileImageUrl ?? x.profileImageUrl ?? '/img/kakao.png';

  return {
    id: String(x.id ?? ''),
    profileUrl: String(profileUrl),
    author: String(x.user?.name ?? ''),
    timeAgo: created ? created.fromNow() : '',
    badge: String(x.taskMessage ?? ''),
    content: x.content ?? '',
    imageUrl:
      Array.isArray(x.images) && x.images.length > 0
        ? String(x.images[0])
        : undefined,
    likeCount: Number.isFinite(Number(x.hearts)) ? Number(x.hearts) : 0,
    commentCount: Number.isFinite(Number(x.likes)) ? Number(x.likes) : 0,
  };
}

/** 피드 목록 */
export async function fetchFeeds(): Promise<Post[]> {
  const { data } = await api.get<FeedEnvelope>('/feed');
  return pickList(data).map(toPost);
}

/** 피드 검색 */
export async function searchFeeds(q: string): Promise<Post[]> {
  const { data } = await api.get<FeedEnvelope>('/feed/search', {
    params: { q },
  });
  return pickList(data).map(toPost);
}

/** 리액션 (좋아요 등) */
export async function reactFeed(
  id: number | string,
  body: Record<string, unknown> = {},
) {
  const { data } = await api.patch(`/feed/${id}/reaction`, body);
  return data as unknown;
}
