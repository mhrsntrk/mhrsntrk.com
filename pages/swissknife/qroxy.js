import React, { useState } from 'react';
import Container from '@/components/Container';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

export default function qroxy() {
  const [activeTab, setActiveTab] = useState(1);
  const [checked, setChecked] = useState(false);
  const [generationName, setGenerationName] = useState('');
  const [generationEmail, setGenerationEmail] = useState('');
  const [generationTarget, setGenerationTarget] = useState('');
  const [generatedURL, setGeneratedURL] = useState('');
  const [generatedQR, setGeneratedQR] = useState('/static/qr-sample.png');
  const [updateTarget, setUpdateTarget] = useState('');
  const [updateUUID, setUpdateUUID] = useState('');
  const [updatedMessage, setUpdatedMessage] = useState('');

  const qroxyBase = process.env.NEXT_PUBLIC_QROXY_API;

  const onGenerationNameChange = (e) => setGenerationName(e.target.value);
  const onGenerationEmailChange = (e) => setGenerationEmail(e.target.value);
  const onGenerationTargetChange = (e) => setGenerationTarget(e.target.value);
  const onUpdateTargetChange = (e) => setUpdateTarget(e.target.value);
  const onUpdateUUIDChange = (e) => setUpdateUUID(e.target.value);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const generate = async (e) => {
    e.preventDefault();
    const data = {
      generationName,
      generationEmail,
      generationTarget
    };
    const res = await fetch(`${qroxyBase}/generate`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const response = await res.json();
    console.log(response.url);
    setGeneratedURL(response.url);
    setGeneratedQR(response.qr);
  };

  const update = async (e) => {
    e.preventDefault();
    const data = {
      updateUUID,
      updateTarget
    };
    console.log(qroxyBase);
    const res = await fetch(`${qroxyBase}/update`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const response = await res.json();
    console.log(response.message);
    setUpdatedMessage(response.message);
  };

  return (
    <Container>
      <NextSeo
        title="qroxy – mhrsntrk"
        description={` `}
        canonical="https://mhrsntrk.com/swissknife/qroxy"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/qroxy',
          title: 'qroxy – mhrsntrk',
          description: ``
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          qroxy - Dynamic QR Codes
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          You can create QR code graphics easily by yourself with goqr.me's API.
          The API is very straightforward and easy to use. I have tried to
          implement the easiest method like sending a image source link to API.
        </p>
        <ul className="flex w-full border-b">
          <li className="w-1/2 mr-1">
            <button
              className={
                'inline-block w-full px-4 py-2 text-black focus:outline-none dark:text-white' +
                (activeTab === 1 ? ' font-semibold border-b-4 rounded-t' : '')
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(1);
              }}
            >
              Generate
            </button>
          </li>
          <li className="w-1/2 mr-1">
            <button
              className={
                'inline-block w-full px-4 py-2 text-black focus:outline-none dark:text-white' +
                (activeTab === 2 ? ' font-semibold border-b-4 rounded-t' : '')
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(2);
              }}
            >
              Update
            </button>
          </li>
        </ul>
        <div className="w-full p-2">
          {activeTab === 1 && (
            <>
              <form className="mt-4 sm:mt-6" onSubmit={generate}>
                <div className="">
                  <div className="mb-4">
                    <h2 className="text-lg text-gray-600 text-bold dark:text-gray-400">
                      Contact Information
                    </h2>
                    <input
                      id="generation-name"
                      type="text"
                      value={generationName}
                      onChange={onGenerationNameChange}
                      required
                      className="block w-full px-4 py-3 mb-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="John Doe"
                    ></input>
                    <input
                      id="generation-email"
                      type="email"
                      value={generationEmail}
                      onChange={onGenerationEmailChange}
                      required
                      className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="john@doe.com"
                    ></input>
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-600 text-bold dark:text-gray-400">
                      Target URL
                    </h2>
                    <input
                      id="generation-target"
                      type="url"
                      value={generationTarget}
                      onChange={onGenerationTargetChange}
                      required
                      className="block w-full px-4 py-3 mb-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="https://generate.com"
                    ></input>
                  </div>
                </div>
                <div className="">
                  <div className="relative w-full h-5 mb-14 sm:mb-8 check-box">
                    <label className="inline-flex items-center ml-2 text-gray-600 dark:text-gray-400">
                      <input
                        type="checkbox"
                        checked={checked}
                        id="id"
                        name="name"
                        className="absolute w-0 h-0 opacity-0 cursor-pointer"
                        onChange={handleChecked}
                      />
                      <span className="absolute top-0 w-5 h-5 mt-1 bg-gray-600 rounded cursor-pointer checkmark sm:mt-1"></span>
                      <span className="ml-8 text-sm">
                        I give consent to my personal information to be stored
                        for personal use.
                      </span>
                    </label>
                  </div>
                  <button
                    aria-label="generate"
                    type="submit"
                    disabled={checked == false}
                    className="flex justify-center w-full px-4 py-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-red-500 hover:bg-red-500"
                  >
                    Generate
                  </button>
                </div>
              </form>
              {generatedURL.length > 0 ? (
                <div className="p-8 mt-16 text-gray-600 border border-black rounded-md dark:text-gray-400 dark:border-white">
                  <div className="flex justify-center w-full">
                    <Image
                      alt="qr-code"
                      height={350}
                      width={350}
                      src={generatedQR}
                      className=""
                    />
                  </div>
                  <div className="flex justify-center w-full mt-2">
                    <a
                      className="text-sm text-gray-400 transition hover:text-gray-600"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={generatedURL}
                    >
                      {generatedURL.slice(qroxyBase.length + 1)}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="w-full p-8 mt-10"></div>
              )}
            </>
          )}
          {activeTab === 2 && (
            <>
              <form className="mt-4 sm:mt-6" onSubmit={update}>
                <div className="">
                  <h2 className="text-lg text-gray-600 text-bold dark:text-gray-400">
                    UUID
                  </h2>
                  <input
                    id="update-uuid"
                    type="text"
                    value={updateUUID}
                    onChange={onUpdateUUIDChange}
                    required
                    className="block w-full px-4 py-3 mb-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="d55c3310-35a8-11ec-8f24-33733cb50609"
                  ></input>
                  <h2 className="text-lg text-gray-600 text-bold dark:text-gray-400">
                    Target URL
                  </h2>
                  <input
                    id="update-target"
                    type="url"
                    value={updateTarget}
                    onChange={onUpdateTargetChange}
                    required
                    className="block w-full px-4 py-3 mb-8 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="https://update.com"
                  ></input>
                  <button
                    aria-label="update"
                    type="submit"
                    className="flex justify-center w-full px-4 py-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-red-500 hover:bg-red-500"
                  >
                    Update
                  </button>
                </div>
              </form>
              {updatedMessage.length > 0 ? (
                <div className="w-full p-8 mt-10 text-gray-600 border border-black rounded-md dark:text-gray-400 dark:border-white">
                  <p>{updatedMessage}</p>
                </div>
              ) : (
                <div className="w-full p-8 mt-10"></div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
