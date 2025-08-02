"use client";

import {useState, useEffect, useRef} from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // Default URL, can be changed laters
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      displayAnimation(query);
    }
  }, []);

  async function displayAnimation(query) {
    await delay(2000); // Wait for 1 second before starting the animation
    setShowCursor(true); // Show the cursor after the delay
    await delay(1000 + 3000); // Wait for 1 second before typing
    setShowCursor(false); // Show the cursor after the delay
    humanType(query);
    await delay(2000 + 200*query.length); // Wait for the typing animation to finish
    window.location.href = `https://google.com/search?q=${query}`;
  }

  function humanType(text, minDelay = 50, maxDelay = 200) {
    let i = 0;

    function typeNextChar() {
        if (i < text.length) {
            setSearchQuery(text.substring(0,i+1)); // Update the search query state
            i++;
            const delay = Math.random() * (maxDelay - minDelay) + minDelay;
            setTimeout(typeNextChar, delay);
        }
    }

    typeNextChar();
}

  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="items-center justify-items-center w-[100%] text-center">
        <svg height="92" viewBox="0 0 272 92" width="272" xmlns="http://www.w3.org/2000/svg"><path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"></path><path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"></path><path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"></path><path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"></path><path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"></path><path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"></path></svg>
        <span className="mt-[15px]">is free and you should learn how to use it</span><br/>
        <div className="mt-5 w-[45%]">
          <div className='p-2 border border-gray-300 rounded-md focus:outline-none mr-2 w-[100%] text-center min-h-[42px]'>
            {searchQuery}
          </div>
        </div>
      </div>
      {showCursor && <AnimatedCursor duration={3000} />}
    </div>
  );
}

const AnimatedCursor = ({ duration = 2000 }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position
    cursor.style.left = '0px';
    cursor.style.top = '0px';

    // Calculate center of the screen
    const centerX = window.innerWidth / 2;
    const centerY = (window.innerHeight / 2) + 60;

    // Trigger animation
    setTimeout(() => {
      cursor.style.transition = `left ${duration}ms ease, top ${duration}ms ease`;
      cursor.style.left = `${centerX}px`;
      cursor.style.top = `${centerY}px`;
    }, 100);
  }, [duration]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundColor: 'white',
      }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
        <path d="M 13 2 C 11.355469 2 10 3.355469 10 5 L 10 16.8125 L 9.34375 16.125 L 9.09375 15.90625 C 7.941406 14.753906 6.058594 14.753906 4.90625 15.90625 C 3.753906 17.058594 3.753906 18.941406 4.90625 20.09375 L 4.90625 20.125 L 13.09375 28.21875 L 13.15625 28.25 L 13.1875 28.3125 C 14.535156 29.324219 16.253906 30 18.1875 30 L 19.90625 30 C 24.441406 30 28.09375 26.347656 28.09375 21.8125 L 28.09375 14 C 28.09375 12.355469 26.738281 11 25.09375 11 C 24.667969 11 24.273438 11.117188 23.90625 11.28125 C 23.578125 9.980469 22.394531 9 21 9 C 20.234375 9 19.53125 9.300781 19 9.78125 C 18.46875 9.300781 17.765625 9 17 9 C 16.648438 9 16.316406 9.074219 16 9.1875 L 16 5 C 16 3.355469 14.644531 2 13 2 Z M 13 4 C 13.554688 4 14 4.445313 14 5 L 14 16 L 16 16 L 16 12 C 16 11.445313 16.445313 11 17 11 C 17.554688 11 18 11.445313 18 12 L 18 16 L 20 16 L 20 12 C 20 11.445313 20.445313 11 21 11 C 21.554688 11 22 11.445313 22 12 L 22 16 L 24.09375 16 L 24.09375 14 C 24.09375 13.445313 24.539063 13 25.09375 13 C 25.648438 13 26.09375 13.445313 26.09375 14 L 26.09375 21.8125 C 26.09375 25.277344 23.371094 28 19.90625 28 L 18.1875 28 C 16.722656 28 15.457031 27.476563 14.40625 26.6875 L 6.3125 18.6875 C 5.867188 18.242188 5.867188 17.757813 6.3125 17.3125 C 6.757813 16.867188 7.242188 16.867188 7.6875 17.3125 L 12 21.625 L 12 5 C 12 4.445313 12.445313 4 13 4 Z"></path>
        </svg>
    </div>
  );
};

const delay = ms => new Promise(res => setTimeout(res, ms));