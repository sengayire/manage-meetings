import React from 'react'
import '../assets/styles/index.scss'
import '../assets/styles/styles.css'

class HelloWorld extends React.Component {
  static initialState = {
    clicks: 0
  }

  state = HelloWorld.initialState

  incrementClicks = () => {
    this.setState(({ clicks }) => ({ clicks: clicks + 1 }))
  }

  resetClicks = () => {
    this.state.clicks > 0 && this.setState(HelloWorld.initialState)
  }

  render () {
    const { clicks } = this.state
    return (
      <div className='hello-world'>
        <h1>Hello MRM</h1>
        <p>Meeting Room project starts here...</p>
        <button className='hello' onClick={this.incrementClicks}>
          Clicked {clicks} times
        </button>
        <button
          onClick={this.resetClicks}
          style={{ marginLeft: 10 }}
          disabled={clicks <= 0}
        >
          Reset Counts
        </button>
      </div>
    )
  }
}

export default HelloWorld
