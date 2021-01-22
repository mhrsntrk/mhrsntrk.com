import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import Container from '@/components/Container';
import { NextSeo } from 'next-seo';

export default function auth() {
  const [session] = useSession();

  const [input, setInputs] = useState({
    email: ''
  });

  const handleOnChange = (e) => {
    setInputs(() => ({
      [e.target.id]: e.target.value
    }));
  };

  return (
    <Container>
      <NextSeo
        title="Authentication – mhrsntrk"
        canonical="https://mhrsntrk.com/auth"
        openGraph={{
          url: 'https://mhrsntrk.com/auth',
          title: 'Authentication – mhrsntrk',
          description: ``
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8">
        {!session && (
          <>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              Authentication
            </h1>
            <div className="w-full mb-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You are not signed in, you can enter your e-mail address click
                the sign in button.
              </p>
              <div className="w-full mb-4 mx-auto">
                <label
                  className="text-gray-600 dark:text-gray-400"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email" 
                  type="email"
                  onChange={handleOnChange}
                  required
                  placeholder="example@example.com"
                  value={input.email}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn('email', input);
                }}
              >
                <button className="bg-black dark:bg-white duration-300 p-2 px-6 rounded-md mb-4">
                  Sign in
                </button>
              </a>
            </div>
          </>
        )}
        {session && (
          <>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              Authentication
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                You are successfully signed in. You can now view the content below. 
              </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Signed in as {session.user.email}
            </p>
            <a
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <button className="flex bg-black dark:bg-white duration-300 p-2 px-6 rounded-md mb-4">
                Sign out
              </button>
            </a>
          </>
        )}
      </div>
    </Container>
  );
}
