# Building an AI Sticker Maker Platform with AI/ML API, Next.js, React, and Tailwind CSS using OpenAI GPT-4o and DALL·E 3 Models 🎨✨

**I got bored. You too?** 😴

Hmm... 🤔

What about creating an **AI Sticker Maker** platform? To be honest, it's a really interesting idea. And hey, we might even generate some profit by simply integrating Stripe as a payment provider. 💰 Yeah, why not?

So, let's get started. Or at least give it a shot! 🚀

## Quick Introduction 🧐

First things first, let's sketch out some pseudocode or make a plan (unless you're a true builder who codes from the hip). It should go something like this:

1. **User enters a prompt** (a text description of how the sticker should look).
2. Our **AI Sticker Maker** will generate a really cutesy sticker. Ta-da! 🥳

Easy-peasy, isn't it? 🍋

But wait, let me clarify. We're going to use two models: **GPT-4o** and **DALL·E 3**, both from OpenAI. They're hyped, for real! 🔥

We'll be using the **AI/ML API**, which provides access to 200+ AI models with a single API. Let me briefly tell you about it.

### Meet AI/ML API 🤖🔗

AI/ML API is a game-changing platform for developers and SaaS entrepreneurs looking to integrate cutting-edge AI capabilities into their products. It offers a single point of access to over **200 state-of-the-art AI models**, covering everything from NLP to computer vision.

**Key Features for Developers:**

- **Extensive Model Library**: 200+ pre-trained models for rapid prototyping and deployment. 📚
- **Customization Options**: Fine-tune models to fit your specific use case. 🎯
- **Developer-Friendly Integration**: RESTful APIs and SDKs for seamless incorporation into your stack. 🛠️
- **Serverless Architecture**: Focus on coding, not infrastructure management. ☁️

Get Started for **FREE** ($0 US dollars): [aimlapi.com](https://aimlapi.com/?via=ibrohim) 🆓

Deep Dive into AI/ML API Documentation (very detailed, can't agree more): [docs.aimlapi.com](https://docs.aimlapi.com/?via=ibrohim) 📖

### Tech Stack Ingredients 🥘

We'll use **TypeScript**, **Next.js**, **React**, and **Tailwind CSS** to build and design our AI Sticker Maker platform.

- **TypeScript** is just a programming language—but a really great one! 📝
- **Next.js** is the React Framework for the web. It enables us to create high-quality web applications with the power of React components. 🌐
- **React** is the library for web and native user interfaces. 🖥️
- **Tailwind CSS** is the best for styling—just build whatever you want, seriously. 🎨

That was just a quick overview of what we're going to use. Feel free to learn more about each of them here:

- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org/) 🦕
- **Next.js**: [nextjs.org](https://nextjs.org/) ⏭️
- **React**: [react.dev](https://react.dev/) ⚛️
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/) 🌬️

## Cooking Has Started 🍳

Let's get our hands dirty! First, create a folder. Open your terminal and enter this:

```bash
mkdir aiml-tutorial
cd aiml-tutorial
```

Now, let's create a new Next.js app:

```bash
npx create-next-app@latest
```

It will ask you a few questions:

✔ **What is your project named?** Here, you should enter your app name. For example: `aistickermaker`. For the rest of the questions, simply hit `enter`.

Here's what you'll see:

```
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

**Pro Tip**: Feel free to choose `Yes` or `No` based on your preferences. I won't judge! 😜

Let's open the project with VSCode:

```bash
code .
```

Now, Visual Studio Code should launch directly with this app. Time to start coding! 💻

## Implementing APIs 🛠️

First things first, let's create APIs for enhancing the user prompt and generating the sticker. Go to the `app` folder, then create a new folder called `api`, and within it, create two new folders: `enhancePrompt` and `generateSticker`. For each, create a `route.ts` file.

### The `enhancePrompt` Endpoint 🧙‍♂️

Now, let's start with the `enhancePrompt` endpoint. Open `route.ts` inside the `enhancePrompt` folder and enter the following code:

```typescript
import { NextResponse } from 'next/server';

const systemPrompt = `
You are tasked with enhancing user prompts to generate clear, detailed, and creative descriptions for a sticker creation AI. The final prompt should be imaginative, visually rich, and aligned with the goal of producing a cute, stylized, and highly personalized sticker based on the user's input.

Instructions:

Visual Clarity: The enhanced prompt must provide clear visual details that can be directly interpreted by the image generation model. Break down and elaborate on specific elements of the scene, object, or character based on the user input.

Example: If the user says "A girl with pink hair," elaborate by adding features like "short wavy pink hair with soft, pastel hues."
Style & Theme:

Emphasize that the final output should reflect a cute, playful, and approachable style.
Add terms like "adorable," "cartoonish," "sticker-friendly," or "chibi-like" to guide the output to a lighter, cuter aesthetic.
Include styling prompts like “minimalistic lines,” “soft shading,” and “vibrant yet soothing colors.”
Personalization:

If a reference or context is given, enhance it to make the sticker feel personalized.
Add context-appropriate descriptors like “wearing a cozy blue hoodie,” “soft pink blush on cheeks,” or “a playful expression.”
Expression & Pose:

Where applicable, refine prompts with suggestions about facial expressions or body language. For example, “Smiling softly with big sparkling eyes” or “A cute wink and a slight tilt of the head.”
Background & Accessories:

Optionally suggest simple, complementary backgrounds or accessories, depending on user input. For instance, "A light pastel background with small, floating hearts" or "Holding a tiny, sparkling star."
Colors:

Emphasize the color scheme based on the user's description, making sure it's consistent with a cute, playful style.
Use descriptors like “soft pastels,” “bright and cheerful,” or “warm and friendly hues” to set the mood.
Avoid Overcomplication:

Keep the descriptions short enough to be concise and not overly complex, as the output should retain a sticker-friendly quality.
Avoid unnecessary details that could clutter the design.
Tone and Language:

The tone should be light, imaginative, and fun, matching the playful nature of stickers.

Example:
User Input:
"A girl with pink hair wearing a hoodie."

Enhanced Prompt:
"An adorable girl with short, wavy pink hair in soft pastel hues, wearing a cozy light blue hoodie. She has a sweet smile with big, sparkling eyes, and a playful expression. The sticker style is cartoonish with minimalistic lines and soft shading. The background is a simple light pastel color with small floating hearts, creating a cute and inviting look."
`;

export async function POST(request: Request) {
    try {
        const { userPrompt } = await request.json();
        console.log("/api/enhancePrompt/route.ts userPrompt: ", userPrompt);

        // Make the API call to the external service
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: userPrompt,
                    },
                ],
                max_tokens: 512,
            }),
        });

        console.log("response: ", response);

        if (!response.ok) {
            // If the API response isn't successful, return an error response
            return NextResponse.json({ error: "Failed to fetch completion data" }, { status: response.status });
        }

        const data = await response.json();
        console.log("data: ", data);

        const assistantResponse = data.choices[0]?.message?.content || "No response available";

        // Return the assistant's message content
        return NextResponse.json({ message: assistantResponse });
    } catch (error) {
        console.error("Error fetching the data:", error);
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }
}
```

### What's Happening Here? 🤔

- **Importing `NextResponse`**: To handle our HTTP responses smoothly.
- **Defining the `POST` function**: This is where the magic happens when someone hits this endpoint.
- **Fetching the `userPrompt`**: We're grabbing the prompt the user provided.
- **Calling OpenAI's API**: We're making a request to enhance the user's prompt using GPT-4o.
- **Handling Responses**: We check if the response is okay, parse the data, and extract the assistant's response.
- **Error Handling**: Because nobody likes unhandled errors ruining the party.

#### Here's an actual example of how the AI enhances the user's prompt. 🐼🍦🌈
You just entered a prompt: 
```text
A cute panda eating ice cream under a rainbow
```

The AI will enhance it to make it more detailed and visually rich. As a result, you should ger a response like: 
```
An adorable, chibi-like panda with big, sparkling eyes and a joyful expression, savoring a colorful scoop of ice cream. The panda is fluffy and round, with classic black-and-white markings, sitting contentedly. The ice cream cone features vibrant, swirling flavors in pastel pink, mint green, and sunny yellow. Above, a playful, cartoonish rainbow arcs across a soft blue sky, adding a cheerful splash of color. The design is sticker-friendly with minimalistic lines and soft shading, ensuring a cute and delightful aesthetic perfect for capturing the joyful scene.
```

Alright, let's dive back into the code cauldron and continue cooking up our AI Sticker Maker! 🍲

## The **`generateSticker`** Endpoint 🖼️

So, we've got our **`enhancePrompt`** endpoint simmering nicely. Time to spice things up with the **`generateSticker`** endpoint. Head over to the **`api/generateSticker`** folder and open up **`route.ts`**. Replace whatever's in there (probably nothing) with this fresh code:

```typescript
// api/generateSticker/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { userPrompt } = await request.json();
        console.log("/api/generateSticker/route.ts userPrompt: ", userPrompt);

        // Make the API call to the external service
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'dall-e-3', // Ensure this is the correct model name
                prompt: userPrompt,
                n: 1, // Number of images to generate
                size: '1024x1024', // Image size
            }),
        });

        console.log("response: ", response);

        if (!response.ok) {
            // If the API response isn't successful, return an error response
            return NextResponse.json({ error: "Failed to fetch completion data" }, { status: response.status });
        }

        const data = await response.json();
        console.log("data: ", data);

        const assistantResponse = data.data[0]?.url || "No response available";

        console.log("assistantResponse: ", assistantResponse);

        // Return the assistant's message content
        return NextResponse.json({ message: assistantResponse });
    } catch (error) {
        console.error("Error fetching the data:", error);
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }
}
```

### What's Happening Here? 🤔

- **Importing `NextResponse`**: To handle our HTTP responses smoothly.
- **Defining the `POST` function**: This is where the magic happens when someone hits this endpoint.
- **Fetching the `userPrompt`**: We're grabbing the prompt the user provided.
- **Calling OpenAI's API**: We're making a request to generate an image based on the prompt using DALL·E 3. 
- **Handling Responses**: We check if the response is okay, parse the data, and extract the image URL.
- **Error Handling**: Because nobody likes unhandled errors ruining the party.

Let's try above prompt with `panda` in action! 🚀

#### Here's our cutesy panda sticker! 🐼🍦🌈

![Cute Panda Eating Ice Cream Under a Rainbow](./generated_stickers/img-NdDGjDeEqR6LevFVwCf4U1t1.png)

Other examples 😍

Prompt: 
```text
A girl with short white+grey hair wearing a oversize shirt
```

![A girl with short white+grey hair wearing a oversize shirt](./generated_stickers/img-gbDUBHcHIwK2gVyEwiOXhvvi.png)


Prompt: 
```
A girl with short black+pink hair wearing a oversize pink shirt
```

![A girl with short black+pink hair wearing a oversize pink shirt](./generated_stickers/img-lo0k25GLYpcYz4f4aXsm73MS.png)

Seems, like really WOW! 🤩

We need a frontend, GUYS! 😅

## Building the Frontend 🎨

Time to put a face on our app! Let's create a user interface where users can input their prompt and get a shiny new sticker.

### The **`page.tsx`** File 📄

Navigate to **`app/page.tsx`** and update it with the following code:

```typescript
// app/page.tsx
'use client';

import Image from "next/image";
import { useState } from 'react';
import { faArrowUp, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from './utils/notify';
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);  // notification message
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
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
          console.log('Sticker URL:', sticker);
          setNotification({ message: 'Cute sticker generated successfully!', type: 'success' });

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
                <h1>Let's Generate Cutesy AI Sticker!</h1>
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
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#2e2e2e] rounded-md p-4 relative w-11/12 max-w-md">
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
                      width={300} 
                      height={300} 
                      className="rounded-md" 
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
    );
}
```

### Breaking It Down 🧩


* **Loader**: We are using really simple, but nice loader; `three horizontal dots with some nice animaton`:

```typescript
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
```


- **State Management**: Using `useState` to handle notifications, loading state, the user's prompt, and the sticker URL.
- **Functions**:
  - **`enhanceUserPrompt`**: Calls our **`/api/enhancePrompt`** endpoint to make the user's prompt more... well, *prompting*.
  - **`generateCuteSticker`**: Hits the **`/api/generateSticker`** endpoint to get that adorable sticker.
  - **`generateSticker`**: Orchestrates the whole process when the user clicks the magic button.
  - **`handleDownload`**: Allows the user to download their new sticker.
  - **`handleClose`**: Closes the sticker modal.
- **UI Components**:
  - **Input Field**: Where the user types their wildest sticker dreams.
  - **Generate Button**: Triggers the sticker generation.
  - **Modal**: Displays the sticker with options to download or close.
  - **Notifications**: Pops up messages to inform the user what's going on.

### A Sprinkle of FontAwesome 🌟

We're using FontAwesome for icons. Make sure to install it:

```bash
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/react-fontawesome@latest
```

You may also check the [FontAwesome documentation](https://docs.fontawesome.com/web/use-with/react) for more details. Or search for other icons [Search icons](https://fontawesome.com/search).

### Handling Notifications 🔔

Remember that notification component we imported? Let's create it.

## Creating the Notification Component 📢

Create a new folder called **`utils`** inside your **`app`** directory. Inside **`utils`**, create a file called **`notify.tsx`** and paste:

```typescript
// app/utils/notify.tsx
import React, { useEffect } from 'react';

type NotificationProps = {
  message: string;
  type: 'error' | 'success' | 'info';
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg z-50`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
```

### What's This For? 🎈

- **Purpose**: To display temporary messages to the user, like "Generating cute sticker..." or "An error occurred."
- **Auto-Close Feature**: It disappears after 3 seconds, just like my motivation on Monday mornings.
- **Styling**: Changes color based on the type of notification.

## Configuring Image Domains 🖼️

Since we're fetching images from OpenAI's servers, Next.js needs to know it's okay to load them. Open up **`next.config.ts`** and add:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
      },
    ],
  },
};

export default nextConfig;
```

### Why Do This? 🤷‍♂️

Because Next.js is a bit overprotective (like a helicopter parent) and won't load images from external domains unless you specifically allow it. This setting tells Next.js, "It's cool, these images are with me."

## Environment Variables 🔑

Now, before you excitedly run your app and wonder why it's not working, let's set up our environment variables.

### Setting Up Your AI/ML API Key 🗝️

Create a file called **`.env.local`** in the root of your project and add:

```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

Replace **`your_openai_api_key_here`** with your actual AI/ML API key. If you don't have one, you might need to sign up at [AI/ML API](https://aimlapi.com/?via=ibrohim) and grab it. It's absolutely **FREE** to get started!

Here's a Quick Tutorial on how to get your API key: [How to get API Key from AI/ML API. Quick step-by-step tutorial with screenshots for better understanding.](https://medium.com/@abdibrokhim/how-to-get-api-key-from-ai-ml-api-225a69d0bb25)

> **Warning**: Keep this key secret! Don't share it publicly or commit it to Git. Treat it like your Netflix password.

## Fire It Up! 🚀

Time to see this baby in action.

### Running the Development Server 🏃‍♀️

In your terminal, run:

```bash
npm run dev
```

This starts the development server. Open your browser and navigate to **`http://localhost:3000`**.

You should see your AI Sticker Maker platform. 🌟

![AI Sticker Maker](./app_images/main_view.png)

### Testing It Out 🧪

- **Enter a Prompt**: Something like *"A girl with short white+grey hair wearing a oversize shirt"*. Go wild!
![Generated Sticker](./app_images/input.png)

- **Click the Button**: Hit that generate button and watch the magic unfold.
- **Wait for It...**: You'll see notifications keeping you posted.
- **Voilà!**: Your AI-generated sticker should appear. Bask in its glory.

![Generated Sticker](./app_images/gen_sticker.png)

## Troubleshooting 🛠️

- **"Failed to fetch completion data"**: Double-check your API key and make sure it's set correctly.
- **Images Not Loading**: Ensure your **`next.config.ts`** file is set up as shown above.
- **App Crashes**: Open your console and see what errors pop up. Google is your friend!

## Wrapping Up 🎁

Congratulations! You've just built an AI Sticker Maker that's both fun and functional. Not only did you delve into the world of AI and Next.js, but you also made something that can bring a smile to people's faces.

### What's Next? 🚧

- **Styling**: Customize the look and feel. Make it as fabulous or minimalist as you like.
- **Features**: Add user accounts, sticker galleries, or even a feature to create sticker packs.
- **Monetization**: Integrate Stripe and start charging for premium stickers. Time to make some moolah!

## Final Thoughts 💭

Building this app was like making a sandwich with layers of tech goodness. We've got AI models as the filling, Next.js as the bread, and a sprinkle of humor as the secret sauce.

Remember, the world is your oyster (or sticker). Keep experimenting, keep building, and most importantly, have fun!

Happy coding! 🎉

Full implementation available on Github [AI Sticker Maker](https://github.com/abdibrokhim/ai-sticker-maker).

It’s Absolutely FREE to get started! [Try It Now click](https://aimlapi.com/?via=ibrohim)

Also check out this tutorial, it's very interesting! [Building a Chrome Extension from Scratch with AI/ML API, Deepgram Aura, and IndexedDB Integration](https://medium.com/@abdibrokhim/building-a-chrome-extension-from-scratch-with-ai-ml-api-deepgram-aura-and-indexeddb-integration-2e5d1e6fbfb0)

Should you have any questions or need further assistance, don’t hesitate to reach out via email at `abdibrokhim@gmail.com`.