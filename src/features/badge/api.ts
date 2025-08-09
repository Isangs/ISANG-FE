import api from '@/shared/api/axios';

export async function getBadgeGallery() {
  const { data } = await api.get('/badge/gallery');
  return data?.result ?? data;
}
export async function getBadgeDetail() {
  const { data } = await api.get('/badge/detail');
  return data?.result ?? data;
}
