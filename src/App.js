import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'

class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  handleShelfUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() =>
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    )
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} handleShelfUpdate={this.handleShelfUpdate}/>
        )}/>

        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} handleShelfUpdate={this.handleShelfUpdate}/>
        )}/>

      </div>
    )
  }
}

export default App
