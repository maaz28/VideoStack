import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { UserSession } from 'blockstack'
import { appConfig } from '../constants/constant';
let friendID;

class MainWindow extends Component {
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    // this.loadMe()
    // console.log(username)
  }

  callWithVideo(video) {
    const { startCall } = this.props;
    const config = { audio: true, video };
    return () => startCall(true, friendID, config);
  }

  signOut(e) {
    console.log(this, "In Signout")
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  name(value) {
    let name = value.split('.')
    return name[0];
  }

  render() {
    const username = this.name(this.userSession.loadUserData().username);
    const { clientId } = this.props;
    document.title = `${clientId} - VideoCall`;
    return (
      <div className="container main-window">
        <div>
          <h3>
            Hi {username}, your ID is
            <input
              type="text"
              className="txt-clientId"
              defaultValue={clientId}
              readOnly
            />
          </h3>
          <h4>Get started by calling a friend below</h4>
        </div>
        <div>
          <input
            type="text"
            className="txt-clientId"
            spellCheck={false}
            placeholder="Your friend ID"
            onChange={event => friendID = event.target.value}
          />
          <div>
            <button
              title="Video Call"
              type="button"
              className="btn-action fa fa-video-camera"
              onClick={this.callWithVideo(true)}
            />
            <button
              title="Audio Call"
              type="button"
              className="btn-action fa fa-phone"
              onClick={this.callWithVideo(false)}
            />
            <button
              onClick={this.signOut}
              title="Signout"
              type="button"
              className="btn-action fa fa-sign-out"
            />
          </div>
        </div>
      </div>
    );
  }
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired
};

export default MainWindow;
