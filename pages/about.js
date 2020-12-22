import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';

export default function About() {
  return (
    <Container>
      <NextSeo
        title="About Me – mhrsntrk"
        canonical="https://mhrsntrk.com/about"
        openGraph={{
          url: 'https://mhrsntrk.com/about',
          title: 'About Me – mhrsntrk'
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
          <p>
            Vestibulum id ligula porta felis euismod semper. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
            porta gravida at eget metus. Sed posuere consectetur est at
            lobortis. Maecenas sed diam eget risus varius blandit sit amet non
            magna. Duis mollis, est non commodo luctus, nisi erat porttitor
            ligula, eget lacinia odio sem nec elit. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p>
            Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed
            diam eget risus varius blandit sit amet non magna. Nullam quis risus
            eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis
            euismod semper. Cras mattis consectetur purus sit amet fermentum.
            Etiam porta sem malesuada magna mollis euismod.
          </p>
        </div>
      </div>
    </Container>
  );
}
