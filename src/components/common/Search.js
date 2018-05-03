import React from 'react'
import Loading from './Loading'
import './Search.css'
import {API_URL} from '../../config'
import {handleResponse} from '../../helpers'

class Search extends React.Component{
  state = {
    searchQuery: '',
    loading: false
  }

  handleChange(event){
    const searchQuery = event.target.value
    this.setState({searchQuery}, () =>  console.log(this.state.searchQuery))

    if(!searchQuery)
      return ''

    this.setState({loading: true})

    fetch(`${API_URL}/autocomplete/?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then((result) => {
        console.log(result)
        this.setState({loading: false})
      })

  }

  render(){
    const {loading} = this.state
    return(
      <div className="Search">
      <span className="Search-icon"></span>
        <input className="Search-input" 
              type="text"
              placeholder="Currency name"
              onChange={this.handleChange.bind(this)} />
        {loading &&
          <div className="Search-loading">
            <Loading width='12px' height='12px'/>
          </div>
        }
      </div>
    )
  }
}

export default Search