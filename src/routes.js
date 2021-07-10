import { Switch, Route } from 'react-router-dom';
import List from './views/List';
import Info from './views/Info';

export default (
   <Switch>
      <Route exact path="/" component={List} />
      <Route exact path="/pokemon/:name" component={Info} />
   </Switch>
);
