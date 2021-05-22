import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from "./components/AuthComponents/utils/authContext";
import Signup from "./components/AuthComponents/SignUp";
import Login from "./components/AuthComponents/Login";
import PrivateRoute from './components/AuthComponents/utils/PrivateRoute';
import Home from './components/Home';
import ProtectedRoute from './components/AuthComponents/utils/ProtectedRoute';
import UnConfirmedUser from './components/AuthComponents/UnConfirmedUser';
import ConfirmUser from './components/AuthComponents/ConfirmUser';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/unconfirmeduser" component={UnConfirmedUser} />
            <Route path="/auth/:id" component={ConfirmUser} />
            <ProtectedRoute path="/register" component={Signup} />
            <ProtectedRoute path="/login" component={Login} />
            <Route path="*" component={Login} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
