'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const pathname = usePathname();

  useEffect(() => {
    redirect('/mypage');
  }, [pathname]);

  return <></>;
}
