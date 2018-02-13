import React from 'react'
import { graphql } from 'react-apollo'

import {
  branch,
  compose,
  renderComponent
} from 'recompose'

import {
  UserQuery
} from 'app/gql/user'

import {
  GITHUB_CLIENT_ID,
} from 'config/project'

import {
  ERR_NETWORK_STATUS,
} from 'app/utils/consts'

import LoadingPage from 'app/pages/Loading'
import LogoutPage from 'app/pages/Logout'

/* The style will only load when user hits PROFILE_URL path */
import 'app/style/split.less'

const Profile = props => {
  console.log('Your Github ID : ', props.data.loggedInUser.githubUserId)
  return (
    <div className="mb20">
      <div className="section text-center purple-flat accent-background">
        <div className="container">
          <h1 className="heading primary-color">Your're now logged in!</h1>
          <div className="mt40">
            <a
              onClick={() => props.auth.logout()}
              className="button mobile-text-center text-black-color"
              >
                <span> Disconnect me, please</span>
              </a>
          </div>
        </div>
      </div>
      <div className="mt20 pd20 text-center purple-white">
        <div className="container mobile-text-center text-center pd20 this-class-is-now-loaded">
          <p className="subheading primary-color">
            A new CSS chunk was loaded!
          </p>
        </div>
      </div>
    </div>
  )
}

const ErrorPage = () => (
  <h1>LOADING</h1>
)

/*

  This container uses recompose to handle graphql request lifecycle.
  See: https://github.com/acdlite/recompose/blob/master/docs/API.md

*/

export default compose(
  graphql(UserQuery),
  branch(
    props => props.data.loading,
    renderComponent(LoadingPage),
    branch(
      props => props.data.error && props.data.networkStatus === ERR_NETWORK_STATUS,
      renderComponent(ErrorPage),
      branch(
        props => !props.data.loggedInUser,
        renderComponent(LogoutPage),
        renderComponent(Profile)
      )
    )
  )
)(Profile)
