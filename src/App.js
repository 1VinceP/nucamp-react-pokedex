import routes from './routes';
// every browser has unique styling for elements such as buttons, inputs, etc.
// this reset file makes everything the same across browsers
// make sure the reset import comes _before_ App.scss otherwise it could overwite the App.scss styles
import './reset.css';
import './App.scss';

/**
 * most of the elements here are for creating the layout. The important one here is the .view element
 * the routes for the app are contained in .view because we want all of our routes to render inside of the pokedex
 */

function App() {
   return (
      <div className="app">
         <div className="pokedex">{routes}</div>
      </div>
   );
}

export default App;
