import React, { Component } from 'react';
import './css/App.css'

const timespan = {
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000
}

let interval
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: timespan.minute * 25,
      sessionRunning: false,
      breakRunning: false
    }
  }

  resetAction = (e) => {
    clearInterval(interval)
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: timespan.minute * 25,
      sessionRunning: false,
      breakRunning: false
    })
    document.getElementById('beep').pause()
    document.getElementById('beep').currentTime = 0
  }

  onStartStop = (e) => {
    if (!this.state.sessionRunning) {
      this.setState({
        sessionRunning: true
      })
      interval = setInterval(() => {
        if (this.state.timeLeft === 0 && this.state.sessionRunning) {
          this.setState({
            sessionRunning: false,
            breakRunning: true,
            timeLeft: timespan.minute * this.state.breakLength
          })
          document.getElementById('beep').play()
        } else if (this.state.timeLeft === 0 && this.state.breakRunning) {
          this.setState({
            sessionRunning: true,
            breakRunning: false,
            timeLeft: timespan.minute * this.state.sessionLength
          })
          document.getElementById('beep').play()
        } else {
          this.setState({
            timeLeft: this.state.timeLeft - timespan.second
          })
        }
      }, timespan.second)
    } else {
      clearInterval(interval)
      this.setState({
        sessionRunning: false
      })
    }
  }

  breakDecrement = (e) => {
    if (!this.state.sessionRunning) {
      this.setState({
        breakLength: this.state.breakLength === 1 ? 1 : this.state.breakLength - 1
      })
    }
  }

  breakIncrement = (e) => {
    if (!this.state.sessionRunning) {
      this.setState({
        breakLength: this.state.breakLength === 60 ? 60 : this.state.breakLength + 1
      })
    }
  }

  sessionDecrement = (e) => {
    if (!this.state.sessionRunning) {
      this.setState({
        sessionLength: this.state.sessionLength === 1 ? 1 : this.state.sessionLength - 1,
        timeLeft: this.state.sessionLength === 1 ? timespan.minute : timespan.minute * (this.state.sessionLength - 1)
      })
    }
  }

  sessionIncrement = (e) => {
    if (!this.state.sessionRunning) {
      this.setState({
        sessionLength: this.state.sessionLength === 60 ? 60 : this.state.sessionLength + 1,
        timeLeft: this.state.sessionLength === 60 ? timespan.hour : timespan.minute * (this.state.sessionLength + 1)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <label id='break-label'>Break Length</label>
          <button id='break-decrement' onClick={this.breakDecrement}>- Break</button>
          <button id='break-increment' onClick={this.breakIncrement}>+ Break</button>
        </div>
        <div>
          <label id='session-label'>Session Length</label>
          <button id='session-decrement' onClick={this.sessionDecrement}>- Session</button>
          <button id='session-increment' onClick={this.sessionIncrement}>+ Session</button>
        </div>
        <div>
          <div id='break-length'>{this.state.breakLength}</div>
          <div id='session-length'>{this.state.sessionLength}</div>
          <div id='timer-label'>{this.state.sessionRunning ? 'Session' : ''}{this.state.breakRunning ? 'Break' : ''} -- {this.state.timeLeft}</div>
          <div id='time-left'>{Math.floor(this.state.timeLeft / 60 / 1000).toString().padStart(2, '0') +
            ':' + Math.floor(this.state.timeLeft / 1000 % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <div>
          <button id='start_stop' onClick={this.onStartStop}>Start/Stop</button>
          <button id='reset' onClick={this.resetAction}>Reset</button>
          <audio id='beep' src='https://goo.gl/65cBl1'></audio>
        </div>
      </div>
    );
  }
}

export default App;
