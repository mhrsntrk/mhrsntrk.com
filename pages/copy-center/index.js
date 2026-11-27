import AppPage from '@/components/AppPage';
import { APPS } from '@/lib/apps';

/** Fixed route: the Copy Center App Store listing points here. */
export default function CopyCenter() {
  return <AppPage app={APPS.find((a) => a.slug === 'copy-center')} />;
}
