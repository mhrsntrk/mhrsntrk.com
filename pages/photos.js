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
          description: ` `
        }}
      />
      <div className="mb-8">
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
