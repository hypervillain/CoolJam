import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { graphql } from 'react-apollo'

import AuthService from 'app/utils/AuthService'
import AsyncComponent from 'app/utils/AsyncComponent'

import {
  GithubAuthenticationMutation
} from 'app/gql/user'

import {
  GITHUB_CLIENT_ID,
} from 'config/project'

import {
  LOGOUT_URL,
  PROFILE_URL,
  CALLBACK_URL,
} from 'app/utils/consts'

import MainPage from 'app/pages/Main'
import LoadingPage from 'app/pages/Loading'
import LogoutPage from 'app/pages/Logout'

import 'app/style/color.less'
import 'app/style/main.less'

class App extends Component {
  constructor(props) {
    super(props)
    this.auth = new AuthService(this.props.history, this.props.authenticate)
    this.handleAuthentication = this.handleAuthentication.bind(this)
  }
  componentWillUpdate(nextProps) {
    const { location } = this.props
    this.currentLocation = location.pathname
    if ( nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  handleAuthentication({location}) {
    const githubCode = window.location.search.substring(1).split('&')[0].split('code=')[1]
    if (githubCode) {
      this.auth.handleAuthentication(githubCode)
    }
  }

  render() {
    const { location } = this.props
    this.currentLocation = location.pathname

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    )

    console.log(location)
    return (
      <div className="font-neutral">
        <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path={PROFILE_URL} render={props => {

            /*
              ProfilePage is only loaded when path matches `PROFILE_URL`.
              See `app/utils/AsyncComponent` and more generally what code spliting does
            */

            const ProfilePage = AsyncComponent(() => import('app/containers/Profile').then(module => module.default), { ...props, auth: this.auth });
            return <ProfilePage />

          }}/>
          <Route exact path={LOGOUT_URL} render={props => {
            return <LogoutPage />
          }}/>
          <Route exact path={CALLBACK_URL} render={props => {
            this.handleAuthentication(props)
            return <LoadingPage />
          }}/>
          <Route exact path={'/'} render={props => (
            <div>
              <header className="header purple-accent">
                <div className="container-lrg">
                  <div className="flex col-12 spread mobile-text-center">
                    <a href="" target="_blank" className="nav-link secondary-color">See on Github</a>
                  </div>
                </div>
              </header>
              <MainPage />
            </div>
          )}/>
        </Switch>
        </div>
        {
          location.pathname !== '/' ? (
            <header className="footer">
              <div className="container-lrg">
                <div className="flex col-12 spread">
                  <Link to={'/'} className="logo">
                    <h5 className="primary-color">Back to CoolJam</h5>
                  </Link>
                  <a href="" target="_blank" className="nav-link secondary-color mt8 accent-bg">See on Github</a>
                </div>
              </div>
            </header>
          ) : null
        }
      </div>
    );
  }
}

export default graphql(GithubAuthenticationMutation, { name: 'authenticate'})(withRouter(App))
