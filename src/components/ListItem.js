import { Link } from 'react-router-dom';

export default ({ pokemon }) => {
   const { name } = pokemon;

   return (
      <Link to={`/pokemon/${name}`} className="list-item link">
         {name}
      </Link>
   );
}
