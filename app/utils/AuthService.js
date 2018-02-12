import { graphql } from 'react-apollo'

import {
  TOKEN,
  LOGOUT_URL,
  PROFILE_URL
} from 'app/utils/consts'

class AuthService {

  constructor(history, authenticate) {
    this.history = history
    this.authenticate = authenticate
    this.handleAuthentication = this.handleAuthentication.bind(this)
  }

  handleAuthentication(githubCode) {
    this.authenticate({
      variables: {
        githubCode
      }
    }).then(res => {
      console.log(res)
      window.DB.setItem(TOKEN, res.data.authenticateUser.token)
      this.history.replace(PROFILE_URL)
    }).catch(err => {
  	   console.log(err)
    })
  }

  async logout() {
    window.DB.removeItem(TOKEN)
    location.replace(LOGOUT_URL)
  }

}

export default AuthService
