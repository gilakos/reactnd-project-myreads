import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfUpdate: PropTypes.func.isRequired
  }

  state = {
    query: '',
    foundBooks: []
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
    //console.log(`updating query to: ${query}`)
    BooksAPI.search(query, 20).then(results =>
      {
        if (results.length > 0) {
          //console.log("Found books")
          for (var i = 0; i < results.length; i++) {
            results[i].shelf = 'none'
            for (var j = 0; j < this.props.books.length; j++) {
              if (results[i].id === this.props.books[j].id){
                results[i].shelf = this.props.books[j].shelf
              }
            }
          }
          console.log(results)
          this.setState({foundBooks: results})
        } else {
          //console.log("No books found")
          this.setState({foundBooks: []})
        }
      }
    )
  }

  clearQuery = () => {
    this.setState({query: ''})
  }

  render() {
    const {handleShelfUpdate} = this.props
    const {query, foundBooks} = this.state

    return (<div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/' onClick={this.clearQuery}>Close</Link>
        <div className="search-books-input-wrapper">
          {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */
          }
          <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">

          {
            foundBooks.length !== 0 && (foundBooks.map((book) => <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                    }}></div>
                  <div className="book-shelf-changer">
                    <select onChange={(event) => handleShelfUpdate(book, event.target.value)} value={book.shelf}>
                      <option value="none" disabled="disabled">Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>

                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors[0]}</div>
              </div>
            </li>))
          }

          {foundBooks.length === 0 && (<h4>No results found</h4>)}

        </ol>
      </div>
    </div>)
  }
}

export default SearchBooks
