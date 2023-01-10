import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Container from '@/components/ContactContainer';
import Card from '@/components/ContactCard';
import Info from '@/components/ContactInfo';

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mt-8 mb-8">
        <h1 className="mb-2 text-4xl font-bold text-black md:text-5xl dark:text-white">
          Mahir Şentürk
        </h1>
        <h2 className="mb-10 text-gray-800 dark:text-gray-200 text-md md:text-xl">
          Senior Product Manager at{' '}
          <a
            href="https://energyweb.org"
            className="hover:underline hover:text-red-500 dark:hover:text-red-500"
            aria-label="Energy Web"
            target="_blank"
            rel="noopener noreferrer"
          >
            Energy Web Foundation
          </a>
        </h2>
        <h2 className="mb-8 text-gray-600 dark:text-gray-400">
          {t('profile')}
        </h2>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <Info
            icon="linkedin"
            title="Linkedin"
            href="https://www.linkedin.com/in/mahirsenturk"
          />
          <Info
            icon="github"
            title="Github"
            href="https://github.com/mhrsntrk"
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 mb-4 sm:grid-cols-2">
          <Info
            icon="twitter"
            title="Twitter"
            href="https://twitter.com/mhrsntrk"
          />
          <Info icon="telegram" title="Telegram" href="https://t.me/mhrsntrk" />
        </div>
        <div className="grid w-full grid-cols-1 gap-0 mb-8 sm:gap-4 sm:grid-cols-2">
          <Card
            title={t('booking-title')}
            description={t('booking-description')}
            href="https://cal.com/mhrsntrk"
          />
          <Card
            title={t('email-title')}
            description="m@mhrsntrk.com"
            href="mailto:m@mhrsntrk.com?subject=Website Contact"
          />
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
