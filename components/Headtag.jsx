import  Head from 'next/head'
import React from 'react'

function Headtag() {
  return (
    <Head>
              <title>Fly</title>
              <meta name="description" content="just tell something, trust us, someone will read it." />
              <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="Fly, tell something, write something" />
                <meta name="twitter:title" content="Fly" />
                <meta name="twitter:description" content="Share what you feel in anonymously" />
                

                <meta property="og:title" content="Fly"  />
                <meta property="og:description" content="Share what you feel in anonymously" />
              <link rel="icon" href="./icon.png" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Roboto:wght@500&family=Tangerine:wght@700&display=swap" rel="stylesheet"></link>
            </Head>
  )
}

export default Headtag