import { getAllPhotos } from '@/lib/strapi';
import PhotoViewer from '@/components/PhotoViewer';
import Container from '@/components/Container';
import { NextSeo } from 'next-seo';

export default function Photos({ allPhotos }) {
  return (
    <Container>
      <NextSeo
        title="Photos – mhrsntrk"
        description={` `}
        canonical="https://mhrsntrk.com/gear"
        openGraph={{
          url: 'https://mhrsntrk.com/photos',
          title: 'Photos – mhrsntrk',
          description: `Welcome to my personal blog. I try to collect my ideas, projects, code snippets in this website.`
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8">
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Photos
        </h1>
        <PhotoViewer gallery={allPhotos} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const allPhotos = await getAllPhotos();
  return {
    props: { allPhotos }
  };
}
