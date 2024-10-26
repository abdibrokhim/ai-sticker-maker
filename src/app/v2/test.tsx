'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';
import { faDownload, faImage, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from '../utils/notify';
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);  // notification message
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState("");
  const [stickerUrl, setStickerUrl] = useState("");

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
    setNotification({ message: 'Generating cute sticker...', type: 'info' });

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
            setNotification({ message: 'Failed to generate cute sticker.', type: 'error' });
            return;
          }

          setStickerUrl(sticker);
          setNotification({ message: 'Cute sticker generated successfully!', type: 'success' });

        } catch (error) {
          console.error('An unexpected error occurred:', error);
          setNotification({ message: 'An unexpected error occurred.', type: 'error' });
        } finally {
          setLoading(false);
        }
    };

    const openUserMedia = async () => {
      // Open user file folder to allow the user to select one image
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.click();
  
      fileInput.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
  
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setUploadedImage(reader.result as string);
        };
      };
    };

    const removeUploadedImage = () => {
      setUploadedImage("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 bg-[#212121e6]">
            <Analytics />
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="mb-6 inline-flex justify-center text-2xl font-semibold leading-9">
                <h1>Let&apos;s Generate Cutesy AI Sticker!</h1>
            </div>

            {/* Display Uploaded Image */}
            {uploadedImage && (
              <div className="mb-4 flex items-center justify-center relative">
                {/* <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-20 h-20 rounded-md object-cover"
                /> */}
                <button
                  onClick={removeUploadedImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 hover:bg-red-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
            <div className="lg:w-[60%] w-full mx-auto flex items-center p-2 mb-8 shadow-lg gap-4 bg-[#2e2e2e] rounded-full">
                <button
                    disabled={loading}
                    onClick={openUserMedia}
                    className={`flex items-center justify-center w-12 h-10 rounded-full shadow cursor-pointer bg-[#aeaeae] text-black`}>
                    {!loading 
                        ? <FontAwesomeIcon icon={faImage} />
                        : <span className='flex justify-center items-center text-black text-xl'>{loader()}</span>
                    }
                </button>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter loom video URL here..."
                    className="placeholder:text-[#aeaeae] bg-transparent focus:outline-none text-white outline-none w-full px-4" 
                    disabled={loading}
                />
                <button
                    disabled={prompt === '' || loading}
                    onClick={generateSticker}
                    className={`flex items-center justify-center w-12 h-10 rounded-full shadow ${
                      prompt === '' ? 'cursor-not-allowed bg-[#4e4e4e] text-black'  : 'cursor-pointer bg-[#eeeeee] text-black'}`}
                    >
                    {!loading 
                        ? <FontAwesomeIcon icon={faDownload} />
                        : <span className='flex justify-center items-center text-black text-xl'>{loader()}</span>
                    }
                </button>
            </div>
        </div>
    );
}
