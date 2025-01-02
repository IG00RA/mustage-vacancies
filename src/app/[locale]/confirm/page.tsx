import Confirm from '@/components/Confirm/Confirm';
import { useLocale } from 'next-intl';
export default function Home() {
  const locale = useLocale();
  return (
    <>
      <Confirm locale={locale} />
    </>
  );
}
