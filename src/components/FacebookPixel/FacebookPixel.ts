'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const FacebookPixel = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fbpId = searchParams?.get('fbp') || '';

    import('react-facebook-pixel')
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init(fbpId);
        ReactPixel.pageView();
        if (pathname === `/${locale}/confirm`) {
          ReactPixel.track('Lead', {});
        }
      });
  }, [pathname, searchParams, locale]);

  return null;
};
