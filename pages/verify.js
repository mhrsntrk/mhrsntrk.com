import React from 'react';
import Container from '@/components/Container';

export default function verify() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Authentication
        </h1>
        <div className="w-full mb-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A sign in link has been sent to your email address, please click the link to continue.
          </p>
        </div>
      </div>
    </Container>
  );
}
