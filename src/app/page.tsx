'use client';

import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useUser, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import { faArrowRight, faArrowUp, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from './utils/notify';
import { Analytics } from "@vercel/analytics/react"
import Footer from './utils/footer';
import OverlayCard from './utils/overlaycard';

export default function Home() {
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);  // notification message
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [stickerUrl, setStickerUrl] = useState("");
  const { isSignedIn } = useUser();

  // list of stickers 
  const listOfStickers = [
    {
      path: '/generated_stickers/pbc.png',
    },
    {
      path: '/generated_stickers/cat-ice-cream.jpeg',
    },
    {
      path: '/generated_stickers/cat-thread.jpeg',
    },
    {
      path: '/generated_stickers/img-1sNFZNvYBGztsoxkBbkbuxPy.png',
    },
    {
      path: '/generated_stickers/img-Dl0WhFbqFzDD17LogXaugvWr.png',
    },
    {
      path: '/generated_stickers/img-gbDUBHcHIwK2gVyEwiOXhvvi.png',
    },
    {
      path: '/generated_stickers/img-lendlFIevdwPjmKSPdcL7E1U.png',
    },
    {
      path: '/generated_stickers/img-lo0k25GLYpcYz4f4aXsm73MS.png',
    },
    {
      path: '/generated_stickers/img-NdDGjDeEqR6LevFVwCf4U1t1.png',
    },
    {
      path: '/generated_stickers/img-OXWY46cBBrGxfKboRdhpIaPt.png',
    },
    {
      path: '/generated_stickers/img-RnfFGf22SurTenupNy4O1B3U.png',
    },
  ]

  const loader = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <circle cx={4} cy={12} r={3} fill="currentColor">
        <animate id="svgSpinners3DotsScale0" attributeName="r" begin="0;svgSpinners3DotsScale1.end-0.25s" dur="0.75s" values="3;.2;3" />
    </circle>
    <circle cx={12} cy={12} r={3} fill="currentColor">
        <animate attributeName="r" begin="svgSpinners3DotsScale0.end-0.6s" dur="0.75s" values="3;.2;3" />
    </circle>
    <circle cx={20} cy={12} r={3} fill="currentColor">
        <animate id="svgSpinners3DotsScale1" attributeName="r" begin="svgSpinners3DotsScale0.end-0.45s" dur="0.75s" values="3;.2;3" />
    </circle>
    </svg>
  );

  const enhanceUserPrompt = async (prompt: string) => {
    setNotification({ message: 'Enhancing user prompt...', type: 'info' });

    // Make the API call to the /api/enhancePrompt route and return the enhanced prompt
    const response = await fetch('/api/enhancePrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPrompt: prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch completion data');
    }

    const data = await response.json();
    return data.message;
  };

  const generateCuteSticker = async (prompt: string) => {
    setNotification({ message: 'Generating sticker...', type: 'info' });

    // Make the API call to the /api/generateSticker route and return the generated sticker URL
    const response = await fetch('/api/generateSticker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPrompt: prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch completion data');
    }

    const data = await response.json();
    return data.message;
  };

    const generateSticker = async () => {
        if (!prompt) return;

        setLoading(true);
        setNotification({ message: 'Processing request...', type: 'info' });

        try {
          // Enhance user prompt
          const enhancedPrompt = await enhanceUserPrompt(prompt);

          if (!enhancedPrompt) {
            setNotification({ message: 'Failed to enhance user prompt.', type: 'error' });
            return;
          }

          // Generate cute sticker
          const sticker = await generateCuteSticker(enhancedPrompt); 

          if (!sticker) {
            setNotification({ message: 'Failed to generate sticker.', type: 'error' });
            return;
          }

          setStickerUrl(sticker);
          console.log('Sticker URL:', sticker);
          setNotification({ message: 'Sticker generated successfully!', type: 'success' });

        } catch (error) {
          console.error('An unexpected error occurred:', error);
          setNotification({ message: 'An unexpected error occurred.', type: 'error' });
        } finally {
          setLoading(false);
        }
    };

    const handleDownload = () => {
      if (!stickerUrl) return;
  
      const link = document.createElement('a');
      link.href = stickerUrl;
      link.download = 'cute-sticker.png'; // You can set a default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const handleClose = () => {
      setStickerUrl("");
      setPrompt("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 bg-[#212121e6] noselect">
            <Analytics />
            <OverlayCard />
            <div className="absolute top-4 right-8">
        {!isSignedIn ? (
          <SignInButton>
            <button className="bg-foreground text-gray-100 px-4 py-2 rounded-md dark:bg-background dark:text-gray-900">Sign In</button>
          </SignInButton> ) 
          : (<SignedIn>
              <UserButton />
            </SignedIn>)
        }
      </div> 
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 p-4 absolute sm:top-[100px] top-[60px]">
              <div className="flex items-center bg-orange-600 text-white p-3 rounded-lg shadow-lg hover:bg-orange-500">
                  <span className="mr-2 text-lg">🚀</span>
                  <span>
                  One API 200+, AI Models, Uptime 99.99%. 
                  <a href="https://aimlapi.com/?via=ibrohim" target="_blank" className="ml-2 text-black hover:font-black bg-[#eeeeee] hover:bg-[#ffffff] text-md font-black p-2 rounded-md">
                      Try for FREE <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                  </span>
              </div>
            </div>
            <div className="mb-6 inline-flex mt-64 items-center justify-center text-2xl font-semibold leading-9">
                <h1>{`Let's Generate AI Sticker!`}</h1>
            </div>
            <div className="lg:w-[60%] w-full mx-auto flex items-center p-2 mb-8 shadow-lg gap-4 bg-[#2e2e2e] rounded-full">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A girl with short pink hair wearing a oversize hoodie..."
                    className="placeholder:text-[#aeaeae] bg-transparent focus:outline-none text-white outline-none w-full px-4" 
                    disabled={loading}
                />
                <button
                    disabled={prompt === '' || loading}
                    onClick={generateSticker}
                    className={`flex items-center justify-center w-12 h-10 rounded-full shadow ${
                      prompt === '' ? 'cursor-not-allowed bg-[#4e4e4e] text-black' : 'cursor-pointer bg-[#eeeeee] text-black'}`}
                    >
                    {!loading 
                        ? <FontAwesomeIcon icon={faArrowUp} />
                        : <span className='flex justify-center items-center text-black text-xl'>{loader()}</span>
                    }
                </button>
            </div>
            {/* Modal */}
            {stickerUrl && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
                <div className="bg-[#2e2e2e] rounded-md p-4 relative w-11/12 max-w-4xl">
                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 bg-[#4e4e4e] rounded-full hover:bg-[#5e5e5e] transition"
                    title="Download"
                  >
                    <FontAwesomeIcon icon={faDownload} className="text-white" />
                  </button>
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 bg-[#4e4e4e] rounded-full hover:bg-[#5e5e5e] transition"
                    title="Close"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-white" />
                  </button>
                  {/* Sticker Image */}
                  <div className="flex justify-center items-center">
                    <Image 
                      src={stickerUrl} 
                      alt="Generated Sticker" 
                      objectFit="cover"
                      width={666} 
                      height={666} 
                      className="rounded-md nodrag" 
                    />
                  </div>
                </div>
              </div>
            )}
              <script
                src="https://topmate-embed.s3.ap-south-1.amazonaws.com/v1/topmate-embed.js"
                user-profile="https://topmate.io/embed/profile/abdibrokhim?theme=D5534D"
                btn-style='{"backgroundColor":"#fff","color":"#000","border":"1px solid #000"}'
                embed-version="v1"
                button-text="Book a meeting"
                position-right="30px"
                position-bottom="30px"
                custom-padding="0px"
                custom-font-size="16px"
                custom-font-weight="500"
                custom-width="200px"
            ></script>
            <div className='mt-16'>
                <p className="text-lg p-16 text-center">You may also like...</p>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex flex-row gap-4 items-center justify-center p-4 bg-green-700 hover:bg-green-600 rounded-md shadow-lg'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-lg font-bold'>AI Text Humanizer 🤖</p>
                            <button onClick={() => {
                                window.open('https://humanaize.vercel.app/', '_blank');
                            }} className='bg-[#eeeeee] hover:bg-[#ffffff] text-black text-md font-black p-2 rounded-md'>Try for FREE <FontAwesomeIcon icon={faArrowRight} /></button>
                        </div>
                        <a href='https://humanaize.vercel.app/' target='_blank'>
                            <Image 
                                src="/results_1.png"
                                alt="AI Text Humanizer" 
                                objectFit="cover"
                                width={300} 
                                height={300} 
                                className="rounded-md nodrag" 
                                />
                        </a>
                    </div>
                    <div className='flex flex-row gap-4 items-center justify-center p-4 bg-blue-700 hover:bg-blue-600 rounded-md shadow-lg'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-lg font-bold'>Loom Video Downloader 🙈</p>
                            <button onClick={() => {
                                window.open('https://lovido.lol', '_blank');
                            }} className='bg-[#eeeeee] hover:bg-[#ffffff] text-black text-md font-black p-2 rounded-md'>Try for FREE <FontAwesomeIcon icon={faArrowRight} /></button>
                        </div>
                        <a href='https://lovido.lol' target='_blank'>
                            <Image 
                                src="/loomdl.png"
                                alt="Loom Video Downloader" 
                                objectFit="cover"
                                width={300} 
                                height={300} 
                                className="rounded-md nodrag" 
                                />
                        </a>
                    </div>
                </div>
            </div>
            {/* generated stickers gallery */}
            <div>
              <p className="text-lg p-16 text-center">Generated by people</p>
              <div className="flex flex-wrap justify-center gap-4">
                {listOfStickers.map((sticker, index) => (
                  <div key={index} className="relative w-64 h-64">
                    <Image
                      src={sticker.path}
                      alt={`Generated Sticker ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md nodrag"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 p-8">
              <Footer />
            </div>
        </div>
    );
}
