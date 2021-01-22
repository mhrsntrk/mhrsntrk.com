import React, { useState } from 'react';
import Container from '@/components/Container';
import { useTheme } from 'next-themes';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

export default function qrCode() {
  const { theme, setTheme } = useTheme();
  const [input, setInputs] = useState({
    url: 'https://mhrsntrk.com'
  });
  const handleOnChange = (e) => {
    setInputs(() => ({
      [e.target.id]: e.target.value
    }));
  };

  return (
    <Container>
      <NextSeo
        title="QR Code – mhrsntrk"
        description={` `}
        canonical="https://mhrsntrk.com/qrcode"
        openGraph={{
          url: 'https://mhrsntrk.com/qrcode',
          title: 'QR Code – mhrsntrk',
          description: ``
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          QR Code Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Et qui labore ut ex eu nulla laboris duis nisi proident. Minim et
          ullamco excepteur id. Magna deserunt excepteur sunt consequat pariatur
          fugiat laboris cillum.
        </p>
        <label className="text-gray-600 dark:text-gray-400" htmlFor="url">
          Enter an URL
        </label>
        <input
          id="url"
          type="url"
          onChange={handleOnChange}
          required
          placeholder="http://example.com"
          value={input.url}
          className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-4"
        />
        <label className="text-gray-600 dark:text-gray-400" htmlFor="url">
          Result
        </label>
        <div className="flex justify-center w-full border dark:border-gray-200 border-gray-900 rounded-md">
          {theme === 'dark' ? (
            <Image
              alt="qr-code"
              height={250}
              width={250}
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${input.url}&size=250x250&color=ffffff&bgcolor=000000&margin=20`}
              className=""
            />
          ) : (
            <Image
              alt="qr-code"
              height={250}
              width={250}
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${input.url}&size=250x250&color=000000&bgcolor=ffffff&margin=20`}
              className=""
            />
          )}
        </div>
      </div>
    </Container>
  );
}
