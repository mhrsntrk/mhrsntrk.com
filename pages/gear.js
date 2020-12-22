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
          description: ` `
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          My Gear
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 mb-0">
          You can find all of my gear and setup that I am currently using. 
        </p>
      </div>
      <div className="prose dark:prose-dark max-w-none w-full mb-8">
          <Gear content={allGears.content} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const allGears = await getAllGears();
  const content = await markdownToHtml(allGears[0]?.content || '');
  return {
    props: {
      allGears: {
        ...allGears[0],
        content
      }
    }
  };
}
