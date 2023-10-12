import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Authentication from './components/Authentication/Authentication';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/users/:userId" component={User}></Route>
          <Route exact path="/auth">
            {localStorage.getItem("currentUserId") != null ? <Redirect to="/" /> : <Authentication />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
