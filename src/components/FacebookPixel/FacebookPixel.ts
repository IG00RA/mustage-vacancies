'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const FacebookPixel = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isIdPage = (pathSegment: string): boolean => {
    const idPattern = /^[a-zA-Z0-9]{20,}$/;
    return idPattern.test(pathSegment);
  };

  useEffect(() => {
    const fbpId = searchParams?.get('fbp') || '';

    import('react-facebook-pixel')
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init(fbpId);
        ReactPixel.pageView();
        if (pathname) {
          const segments = pathname.split('/').filter(Boolean);
          const lastSegment = segments[segments.length - 1];

          if (isIdPage(lastSegment)) {
            ReactPixel.track('Lead', {});
          }
        }
      });
  }, [pathname, searchParams, locale]);

  return null;
};
