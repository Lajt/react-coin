import React from 'react'
import {withRouter} from 'react-router-dom'
import Loading from './Loading'
import './Search.css'
import {API_URL} from '../../config'
import {handleResponse} from '../../helpers'

class Search extends React.Component{
  state = {
    searchQuery: '',
    loading: false,
    searchResults: []
  }

  handleChange = (event) => {
    const searchQuery = event.target.value
    this.setState({searchQuery}, () =>  console.log(this.state.searchQuery))

    if(!searchQuery)
      return ''

    this.setState({loading: true})

    fetch(`${API_URL}/autocomplete/?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          searchResults: result
        })
      })
  }

  handleRedirect = (currencyId) => {
    this.setState({
      searchQuery: '',
      searchResults: []
    })

    this.props.history.push(`/currency/${currencyId}`)
  }

  renderSearchResults(){
    const {searchResults, searchQuery, loading} = this.state

    if(!searchQuery)
      return ''

   if(searchResults.length > 0){
    return(
      <div className="Search-result-container">
        {searchResults.map((result) => (
          <div key={result.id} 
              className="Search-result"
              onClick={() => this.handleRedirect(result.id)}>
            {result.name} {(result.symbol)}
          </div>
        ))}
      </div>
    )
   }

   if(!loading){
    return (
      <div className="Search-result-container">
       No results found.
      </div>
    )
   }
  }

  render(){
    const {loading, searchQuery} = this.state

    return(
      <div className="Search">
      <span className="Search-icon"></span>
        <input className="Search-input" 
              type="text"
              placeholder="Currency name"
              value={searchQuery}
              onChange={this.handleChange} />
        {loading &&
          <div className="Search-loading">
            <Loading width='12px' height='12px'/>
          </div>
        }
        {this.renderSearchResults()}
      </div>
    )
  }
}

export default withRouter(Search)