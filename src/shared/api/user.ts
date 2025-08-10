import api from '@/shared/api/axios';
import type { User } from '@/shared/types/user';

type UpdateBody = {
  name: string;
  nickName: string;
  introduce?: string;
  profileUrl: string;
  email?: string;
};

export async function updateUser(form: User, profileImageUrl?: string) {
  const body = {
    name: form.name ?? '',
    nickName: form.nickname ?? '',
    introduce: form.bio ?? '',
    profileUrl: profileImageUrl ?? form.profileUrl ?? '',
    email: form.email ?? '',
  };

  const { data } = await api.patch('/user/update', body);
  return data;
}
