import Container from '../components/Container';
import { getAllGears } from '@/lib/strapi';
import { NextSeo } from 'next-seo';
import Tools from '@/components/Tools';
import markdownToHtml from '@/lib/markdownToHtml';

export default function Uses({ allGears }) {
  return (
    <Container>
      <NextSeo
        title="Tools – mhrsntrk"
        description={` `}
        canonical="https://mhrsntrk.com/gear"
        openGraph={{
          url: 'https://mhrsntrk.com/gear',
          title: 'Tools – mhrsntrk',
          description: `Welcome to my personal blog. You can find the productivity tools that I use everyday.`
        }}
      />
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Productivitiy Tools
        </h1>
        <p className="mt-2 mb-0 text-gray-700 dark:text-gray-300">
          You can find the productivity tools/applications that I use everyday.
        </p>
      </div>
      <div className="w-full mb-8 prose dark:prose-dark max-w-none">
        <Tools content={allGears.content} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const allGears = await getAllGears();
  const second = Array.isArray(allGears) && allGears.length > 1 ? allGears[1] : { content: '' };
  const content = await markdownToHtml(second.content || '');
  return {
    props: {
      allGears: {
        ...second,
        content
      }
    }
  };
}
