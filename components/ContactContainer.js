import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { useTranslation } from 'next-i18next';

export default function Container({ children }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { t } = useTranslation('common');
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-white dark:bg-black">
      <Head>
        <title>Mahir Şentürk</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="flex items-center justify-between w-full max-w-4xl p-4 mx-auto my-0 bg-white sticky-nav md:my-8 dark:bg-black bg-opacity-60">
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              )}
            </svg>
          )}
        </button>
        <div className="items-center hidden sm:hidden md:flex lg:flex xl:flex ">
          <Link href="/">
            <a>
              {theme === 'dark' ? (
                <Image
                  alt="mhrsntrk-logo"
                  height={50}
                  width={250}
                  src="/mhrsntrk-500-white.png"
                  className=""
                />
              ) : (
                <Image
                  alt="mhrsntrk-logo"
                  height={50}
                  width={250}
                  src="/mhrsntrk-500-black.png"
                  className=""
                />
              )}
            </a>
          </Link>
        </div>
        <div className="items-center w-10 h-10 p-2 pl-3 bg-gray-200 rounded dark:bg-gray-800">
          <Link
            href={router.pathname}
            locale={router.locale === 'en' ? 'tr' : 'en'}
          >
            <button
              className="text-sm text-gray-800 dark:text-gray-200"
            >
              {t('change-locale')}
            </button>
          </Link>
        </div>
      </nav>
      <main className="flex flex-col justify-center px-8 bg-white dark:bg-black">
        {children}
      </main>
    </div>
  );
}
