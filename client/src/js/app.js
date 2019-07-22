import React, { Component } from 'react';
import { render } from 'react-dom';
import { UserSession } from 'blockstack';
import VideoCall from './VideoCall';
import Landing from './Landing';
import '../css/mainapp.scss';

class App extends Component {

  constructor() {
    super();
    this.userSession = new UserSession();
  }

  componentWillMount() {
    const session = this.userSession;
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn()
        .then((userData) => {
          if (!userData.username) {
            throw new Error('This app requires a username.')
          }
          window.location = `/`
        })
    }
  }

  render() {
    return (
      <main role="main">
        {this.userSession.isUserSignedIn() ? <VideoCall /> : <Landing />}
      </main>
    );
  }
}
render(<App />, document.getElementById('root'));
