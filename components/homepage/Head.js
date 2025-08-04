import React from "react";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <>
      <Helmet>
        <html lang="en" data-theme="base44" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Capture your basketball journey. Professional videography and highlight reels designed to elevate your game and get you noticed. - built with Base44"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Base44" />

        <link
          rel="icon"
          href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f17cb9229_logo.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f17cb9229_logo.png"
        />
        <link
          rel="manifest"
          href="https://base44.app/api/apps/manifests/6880525899aba54e4ab6850b/manifest.json"
        />

        <title>CourtVision</title>

        <script src="https://cdn.tailwindcss.com"></script>

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://app.base44.com" />
        <meta property="og:title" content="CourtVision" />
        <meta
          property="og:description"
          content="Capture your basketball journey. Professional videography and highlight reels designed to elevate your game and get you noticed."
        />
        <meta
          property="og:image"
          content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f17cb9229_logo.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://app.base44.com" />
        <meta name="twitter:title" content="CourtVision" />
        <meta
          name="twitter:description"
          content="Capture your basketball journey. Professional videography and highlight reels designed to elevate your game and get you noticed."
        />
        <meta
          name="twitter:image"
          content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f17cb9229_logo.png"
        />

        {/* Rewardful */}
        <script>
          {`
            !function(n,u){n._rwq=u,n[u]=n[u]||function(){(n[u].q=n[u].q||[]).push(arguments)}}(window,"rewardful")
          `}
        </script>
        <script
          async
          data-rewardful="0259ba"
          src="https://r.wdfl.co/rw.js"
        ></script>

        {/* CSS/JS Assets */}
        <link rel="stylesheet" href="/static/css/vendors.2b28d5da.css" />
        <link rel="stylesheet" href="/static/css/main.b3ad0f43.css" />
        <script defer src="/static/js/vendors.57616de4.js"></script>
        <script defer src="/static/js/main.bccee424.js"></script>
      </Helmet>

      {/* Your App Content Goes Here */}
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to CourtVision</h1>
      </div>
    </>
  );
};

export default App;