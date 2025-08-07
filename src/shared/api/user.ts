import { User } from '@/shared/types/user';

export async function updateUser(
  form: User,
  accessToken?: string,
  profileImageUrl?: string,
) {
  console.log('⚠️ [임시 요청]', {
    name: form.name,
    nick_name: form.nickname,
    introduce: form.bio,
    profile_url: profileImageUrl ?? '/img/kakao.png',
    email: form.email,
    token: accessToken,
  });

  // TODO: 나중에 PATCH 요청 연결할 것
  return { success: true };
}
