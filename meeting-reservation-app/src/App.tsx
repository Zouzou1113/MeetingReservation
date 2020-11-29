import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import WelcomePage from './components/WelcomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reservation from './components/Reservation';
import UserContext from './components/UserContext';


const App: React.FC = () => {
  return (

        <React.StrictMode>
          <UserContext.Provider value="ZHANG">
            <BrowserRouter>
                <Switch>
                  <Route exact={true} path= '/' component={WelcomePage} />
                  <Route exact={true} path= '/reservation' component={Reservation} />
                </Switch>
            </BrowserRouter>
          </UserContext.Provider>
        </React.StrictMode>
  );
}

export default App;
