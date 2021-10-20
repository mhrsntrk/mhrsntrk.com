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
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-8">
        {!session && (
          <>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
              Authentication
            </h1>
            <div className="w-full mb-4">
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                You are not signed in, you can enter your e-mail address click
                the sign in button.
              </p>
              <div className="w-full mx-auto mb-4">
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
                  className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn('email', input);
                }}
              >
                <button className="p-2 px-6 mb-4 duration-300 bg-black rounded-md dark:bg-white">
                  Sign in
                </button>
              </a>
            </div>
          </>
        )}
        {session && (
          <>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
              Authentication
            </h1>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
                You are successfully signed in. You can now view the content below. 
              </p>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Signed in as {session.user.email}
            </p>
            <a
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <button className="flex p-2 px-6 mb-4 duration-300 bg-black rounded-md dark:bg-white">
                Sign out
              </button>
            </a>
          </>
        )}
      </div>
    </Container>
  );
}
