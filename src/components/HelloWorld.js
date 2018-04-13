import React from 'react'
import '../assets/styles/index.scss'
import '../assets/styles/styles.css'

class HelloWorld extends React.Component {
  state = {
    clicks: 0,
  }

  incrementClicks = ()=>{
    this.setState(({clicks})=>({clicks: clicks+1}))
  }

  render () {
    const { clicks } = this.state;
    return (
      <div className='hello-world'>
        <h1>Hello MRM</h1>
        <p>Meeting Room project starts here...</p>
        <button className="hello" onClick={this.incrementClicks}>Clicked {clicks} times</button>
      </div>
    )
  }
}

export default HelloWorld
