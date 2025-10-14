import Container from '../components/Container';
import { getAllGears } from '@/lib/strapi';
import { NextSeo } from 'next-seo';
import Gear from '@/components/Gear';
import markdownToHtml from '@/lib/markdownToHtml';

export default function Uses({ allGears }) {
  return (
    <Container>
      <NextSeo
        title="Gear – mhrsntrk"
        description={` `}
        canonical="https://mhrsntrk.com/gear"
        openGraph={{
          url: 'https://mhrsntrk.com/gear',
          title: 'Gear – mhrsntrk',
          description: `Welcome to my personal blog. You can find all of my gear and setup that I am currently using.`
        }}
      />
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          My Gear
        </h1>
        <p className="mt-2 mb-0 text-gray-700 dark:text-gray-300">
          You can find all of my gear and setup that I am currently using. 
        </p>
      </div>
      <div className="w-full mb-8 prose dark:prose-dark max-w-none">
          <Gear content={allGears.content} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const allGears = await getAllGears();
  const first = Array.isArray(allGears) && allGears.length > 0 ? allGears[0] : { content: '' };
  const content = await markdownToHtml(first.content || '');
  return {
    props: {
      allGears: {
        ...first,
        content
      }
    }
  };
}
