import React, { useState } from 'react';
import { signIn, signOut, useSession} from 'next-auth/client';
import Container from '@/components/Container';

export default function email() {
  const [session, loading] = useSession();
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const [inputs, setInputs] = useState({
    email: '',
    message: ''
  });

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      });
      setInputs({
        email: '',
        message: ''
      });
    } else {
      setStatus({
        info: { error: true, msg: msg }
      });
    }
  };

  const handleOnChange = (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    });
    const text = await res.text();
    handleResponse(res.status, text);
  };

  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8">
        {!session && (
          <>
            <div className="w-full mb-4 mx-auto">
              <p className="flex mx-auto text-gray-600 dark:text-gray-400 mb-4">
                Not signed in
              </p>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                <button className="bg-black dark:bg-white duration-300 p-2 px-6 rounded-md mb-4 flex">
                  Sign in
                </button>
              </a>
            </div>
          </>
        )}
        {session && (
          <>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              Sendgrid
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              In esse ex mollit est consequat consequat sit reprehenderit
              ullamco. Exercitation fugiat cillum consectetur enim consectetur
              Lorem ex culpa in labore officia eiusmod deserunt nostrud. Minim
              ea proident fugiat commodo est irure aliqua ea nostrud adipisicing
              ad proident.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Signed in as {session.user.email}
            </p>
            <form className="w-full" onSubmit={handleOnSubmit}>
              <div className="w-full mb-4 mx-auto">
                <label
                  className="text-gray-600 dark:text-gray-400"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={handleOnChange}
                  required
                  value={inputs.email}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="w-full mb-4 mx-auto">
                <label
                  className="text-gray-600 dark:text-gray-400"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  onChange={handleOnChange}
                  required
                  value={inputs.message}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <button
                type="submit"
                disabled={status.submitting}
                className="bg-black dark:bg-white duration-300 p-2 px-6 rounded-md mb-4 flex"
              >
                {!status.submitting
                  ? !status.submitted
                    ? 'Submit'
                    : 'Submitted'
                  : 'Submitting...'}
              </button>
            </form>
            {status.info.error && (
              <div className="text-red-500">Error: {status.info.msg}</div>
            )}
            {!status.info.error && status.info.msg && (
              <div className="text-green-500">{status.info.msg}</div>
            )}
            <a
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <button className="bg-black dark:bg-white duration-300 p-2 px-6 rounded-md mb-4 flex">
                Sign out
              </button>
            </a>
          </>
        )}
      </div>
    </Container>
  );
}
