import AppPage from '@/components/AppPage';
import { APPS } from '@/lib/apps';

export default function App({ app }) {
  return <AppPage app={app} />;
}

/** Every app without its own fixed route (Copy Center keeps /copy-center). */
export function getStaticPaths() {
  return {
    paths: APPS.filter((a) => !a.path).map((a) => ({ params: { slug: a.slug } })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  return { props: { app: APPS.find((a) => a.slug === params.slug) } };
}
