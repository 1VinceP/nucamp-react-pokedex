import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPokemon, clearPokemon } from '../redux/pokemonInfoReducer';
import Loader from '../components/Loader';

export default () => {
   /**
    * when using hooks, we don't get some of the "niceties" like having router information mapped automatically to props for us
    * useDispatch allows us to dispatch actions (we must use this since we don't have mapDispatchToProps)
    * useSelector allows us to pull data from redux
    * useParams gives us parameter information from the route
    */
   const dispatch = useDispatch();
   const { loading, pokemon } = useSelector(state => state.pokemonInfo);
   const { name } = useParams();

   // useEffect runs at certain specified times.
   // in this case, it behaves like componentDidMount and it will run the code right after the component mounts
   // if the array at the end had any variables inside of it, this useEffect hook would rerun anytime the variable's value changed
   useEffect(() => {
      dispatch(getPokemon(name));

      // the return in a useEffect hook behaves like componentWillUnmount
      // it runs this code when the component is about to be destroyed
      return () => {
         dispatch(clearPokemon());
      }
   }, []);

   function renderInfo() {
      return (
         <div className="info-container">
            <span className="name">{pokemon.name}</span>
         </div>
      );
   }

   return (
      <div className="info">
         <div className="header">
            <Link to="/" className="link">Back</Link>
         </div>

         {loading
            ? <Loader />
            : renderInfo()
         }
      </div>
   );
}
