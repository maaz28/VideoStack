import React, {
  Component
} from 'react'
import {
  UserSession
} from 'blockstack'
import {
  appConfig
} from '../constants/constant'
import '../css/landing.scss'
import blockstackLogo from '../assets/blockstack-icon.svg'


class Landing extends Component {

  constructor() {
    super()
    this.userSession = new UserSession({
      appConfig
    })
  }

  signIn(e) {
    e.preventDefault()
    this.userSession.redirectToSignIn()
  }

  render() {
    return ( <
      div className = "Landing" >
      <
      div className = "form-signin"
      style = {
        {
          position: 'absolute',
          top: '50%',
          marginLeft: '-8%'
        }
      } >


      <
      button className = "signin-btn"
      onClick = {
        this.signIn.bind(this)
      } >
      <
      img className = "blockstack-logo"
      src = {
        blockstackLogo
      }
      /> <
      span className = "signin-btn-text" >
      Sign - in with Blockstack <
      /span> < /
      button >

      <
      /
      div > <
      /div>
    );
  }
}

export default Landing;