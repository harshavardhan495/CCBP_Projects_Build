// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minsValue: 25,
    secValue: '00',
    timeStatus: false,
    initialTimerValue: 25,
  }

  increaseTime = () => {
    this.setState(prevState => ({
      initialTimerValue: prevState.initialTimerValue + 1,
      minsValue: prevState.minsValue + 1,
    }))
  }

  decreaseTime = () => {
    const {timeStatus, minsValue} = this.state

    if (timeStatus === false && minsValue > 1) {
      this.setState(prevState => ({
        initialTimerValue: prevState.initialTimerValue - 1,
        minsValue: prevState.minsValue - 1,
      }))
    }
  }

  startTimer = () => {
    const {timeStatus} = this.state
    this.setState(prevState => ({timeStatus: !prevState.timeStatus}))
    if (timeStatus !== true) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  resetStatus = () => {
    this.setState({
      initialTimerValue: 25,
      timeStatus: false,
      minsValue: 25,
      secValue: '00',
    })
    clearInterval(this.timerId)
  }

  tick = () => {
    const {minsValue} = this.state
    let {secValue} = this.state
    secValue = parseInt(secValue)

    if (minsValue === 0 && secValue === 0) {
      clearInterval(this.timerId)
      this.setState({minsValue: 25, secValue: '00', timeStatus: false})
    } else {
      const oneSecond = new Date(0, 0, 0, 0, 0, 1, 0)

      const maxTime = new Date(0, 0, 0, 0, minsValue, secValue, 0)

      let diff = maxTime.getTime() - oneSecond.getTime()

      const hrs = Math.floor(diff / 1000 / 60 / 60)

      diff -= hrs * (1000 * 60 * 60)

      const mns = Math.floor(diff / 1000 / 60)

      diff -= mns * (1000 * 60)

      let sec = Math.floor(diff / 1000)

      const leadingZero = '0'

      if (sec < 10) {
        const zeroAppendedValue = leadingZero.concat(sec.toString())
        sec = zeroAppendedValue
      }

      this.setState({minsValue: mns, secValue: sec})
    }
  }

  render() {
    const {minsValue, secValue, timeStatus, initialTimerValue} = this.state

    let buttonContent

    if (timeStatus === true) {
      buttonContent = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
            className="icon-props"
            alt="pause icon"
          />
          Pause
        </div>
      )
    } else {
      buttonContent = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
            className="icon-props"
            alt="play icon"
          />
          Start
        </div>
      )
    }

    return (
      <div className="main-bg-container">
        <h1>Digital Timer</h1>
        <div className="content-container">
          <div className="image-container">
            <div className="timer-zone">
              <h1 className="time-value">
                {minsValue}:{secValue}
              </h1>
              <p className="time-status">{timeStatus ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="control-container">
            <div className="action-buttons-container">
              <button
                className="action-button"
                type="button"
                onClick={this.startTimer}
              >
                {buttonContent}
              </button>
              <button
                className="action-button"
                type="button"
                onClick={this.resetStatus}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="icon-props"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p>set timer limit</p>
            <div className="timer-input-button-container">
              <button
                className="increase-decrease-button"
                type="button"
                onClick={this.increaseTime}
              >
                +
              </button>
              <p className="timer-limit-value">{initialTimerValue}</p>
              <button
                className="increase-decrease-button"
                type="button"
                onClick={this.decreaseTime}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
