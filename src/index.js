import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/common/Header'
import List from './components/list/List'

import './index.css'


class App extends React.Component{

  render(){
    return(
      <div>
        <Header />
        <List />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))