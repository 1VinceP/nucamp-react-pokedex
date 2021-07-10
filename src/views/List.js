import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPokedex, searchPokedex } from '../redux/pokedexReducer';
import Loader from '../components/Loader';
import ListItem from '../components/ListItem';

class List extends Component {
   state = { search: '' };

   componentDidMount() {
      // load pokemon if there are none in the store
      if (this.props.pokemonList.length === 0) {
         this.props.getPokedex();
      }
   }

   handleChangeSearch = e => {
      this.setState({ search: e.target.value });
   }

   handleSearch = () => {
      if (this.state.search) {
         this.props.searchPokedex(this.state.search);
      } else {
         this.props.getPokedex();
      }
   }

   handleSearchEnter = e => {
      if (e.key === 'Enter') {
         this.handleSearch();
      }
   }

   handlePagination = link => {
      this.props.getPokedex(link);
   }

   render() {
      const { pokemonList, loading, previous, next, searchFail } = this.props;

      // map the list of pokemon into individual ListItem components
      const listItems = pokemonList.map(pokemon => {
         return <ListItem key={pokemon.name} pokemon={pokemon} />
      });

      return (
         <div className="list">
            {/* allow users to search for a specific pokemon */}
            <div className="search">
               <input
                  placeholder="Search Pokemon"
                  onChange={this.handleChangeSearch}
                  onKeyDown={this.handleSearchEnter}
                  value={this.state.search}
               />
               <button onClick={this.handleSearch}>Search</button>
            </div>

            {/* show that the list is loading while the api is pending */}
            {loading
               ? <Loader />
               : searchFail
                  ? 'Search failed'
                  : <div className="pokemon-list">{listItems}</div>
            }

            {/* allow users to switch between pages of pokemon */}
            <div className="pagination">
               <button disabled={!previous} onClick={() => this.handlePagination(previous)}>prev</button>
               <button disabled={!next} onClick={() => this.handlePagination(next)}>next</button>
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => {
   const { pokemon, next, previous, loading, searchFail } = state.pokedex;

   return {
      pokemonList: pokemon,
      next,
      previous,
      loading,
      searchFail,
   };
};

const mapDispatchToProps = {
   getPokedex: link => (getPokedex(link)),
   searchPokedex: name => (searchPokedex(name)),
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
