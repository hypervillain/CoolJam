import React from 'react'

import {
  GITHUB_CLIENT_ID,
} from 'config/project'

const LogoutPage = props => (
  <div>
    <div className="section text-center purple-gradient">
      <div className="container">
        <h1 className="heading primary-color">Your're now logged out</h1>
        <h2 className="subheading primary-color">
          Hit the button to re-log using your Github account!
        </h2>
        <div className="mt40">
          <a
            onClick={() => {
              window.location = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`
            }}
            className="button mobile-text-center text-black-color"
            >
              <span> Reconnect me, please</span>
            </a>
        </div>
      </div>
    </div>
  </div>
)

export default LogoutPage
