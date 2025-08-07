'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, User, Globe } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'My', icon: User, path: '/mypage' },
  { name: 'Feed', icon: Globe, path: '/feed' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/20 bg-white/80 shadow backdrop-blur-md">
      <div className="mx-auto flex h-[81px] w-full max-w-sm flex-col items-start pt-[1px]">
        <div className="flex h-[80px] w-full px-4">
          {navItems.map(({ name, icon: Icon, path }) => {
            const isActive = pathname === path;

            return (
              <button
                key={name}
                onClick={() => router.push(path)}
                className="relative flex h-[80px] flex-1 flex-col items-center justify-center"
              >
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <Icon
                    className={clsx(
                      'h-5 w-5',
                      isActive ? 'text-purple-600' : 'text-gray-400',
                    )}
                  />
                </div>
                <div className="mt-1 flex items-center">
                  <span
                    className={clsx(
                      'text-[12px] font-medium whitespace-nowrap',
                      isActive ? 'text-purple-600' : 'text-gray-400',
                    )}
                  >
                    {name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
