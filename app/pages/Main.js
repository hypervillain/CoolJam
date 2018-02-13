import React from 'react'

import {
  GITHUB_CLIENT_ID,
} from 'config/project'

const MainPage = props => {
  return (
    <div>
      <div className="section text-center purple-accent">
        <div className="container">
          <h1 className="heading primary-color">Welcome to CoolJam</h1>
          <h2 className="subheading primary-color">
            A comprehensive starter kit for Graphcool Cloud developers.
          </h2>
          <div className="mt40">
            <a
              onClick={() => window.location = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`}
              className="button mobile-text-center text-black-color"
            >
              <span> Authenticate me via Github*</span>
            </a>
            <p className="primary-color mt20">
              * Authenticate to see the whole demo
            </p>
          </div>
        </div>
      </div>
      <div className="section purple-white">
        <div className="container">
          <h2 className="heading">What is CoolJam?</h2>
          <p className="subheading mt10" style={{color:'rgb(153, 153, 153)', lineHeight: '1.5'}}>
            CoolJam is the fancy name of a complete React-Graphcool starter kit. It aims at giving a simple
            yet complete starting point for Graphcool Cloud developers. Used in conjunction with a CDN like <a className="accent-color" target="_blank" href="https://www.netlify.com">Netlify</a>,
            you get a powerful <a className="accent-color" target="_blank" href="https://jamstack.org">JAMStack</a> to deploy without ever leaving the CLI. Write code, push it to Graphcool and Netlify
            without handling any DevOps or server side scaling.
          </p>
        </div>
        <div className="container mt40">
          <h2 className="heading">What does it contain?</h2>
          <p className="subheading mt10" style={{color:'rgb(153, 153, 153)', lineHeight: '1.5'}}>
            JamCool comes pre-packed with code and configuration.<br/><br/>

            First, we've setup a complete authentication example,
            which can easily be changed to any <a className="accent-color" target="_blank" href="https://github.com/graphcool/templates">Graphcool authentication template</a>.
            It uses Graphcool resolver functions to create and query current user, plus a simple permission system to get a taste of it.
            <br/><br/>
            On the configuration side, we've packed a powerful Webpack configuration, which is (partially) used in production at <a className="accent-color" target="_blank" href="https://www.whire.me">Whire</a>.
            On particular, we've put an accent on how <a className="accent-color" target="_blank" href="https://medium.com/faceyspacey/webpacks-import-will-soon-fetch-js-css-here-s-how-you-do-it-today-4eb5b4929852">CSS chunks</a> should be used on client-side applications.
            <br/><br/>
            After bundling your whole code via Webpack, simply push it and send the given site name to your mother or friends (or both)!
          </p>
        </div>
        <div className="container mt40">
          <h2 className="heading">How do I start?</h2>
          <p className="subheading mt10" style={{color:'rgb(153, 153, 153)', lineHeight: '1.5'}}>
            To get the full example to work on your machine, you will need free accounts on Graphcool, Netlify and Github. You'll also probably need
            to install some packages like <a className="accent-color" target="_blank" href="https://www.netlify.com/docs/cli/">netlify-cli</a>, and read some paper like <a className="accent-color" target="_blank" href="https://www.graph.cool/docs">Graphcool docs</a>.
            <br/><br/>
            Don't worry! We've built a comprehensive step-by-step guide on <a className="accent-color" target="_blank" href="https://github.com/THook/coolJam">Github</a>!
            <br/><br/>
            See you there! Hugo Villain
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainPage
