import './App.css';
import Home  from  "./components/Home"
import Navgatitor from "./components/Navgatitor"
import Registe from "./components/Reginste"
import Login from "./components/Login"
import { HashRouter, Route,Switch } from 'react-router-dom'
import "antd/dist/antd.css"

function App() {
  return (
    <HashRouter basename='/eth-front/build/'>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/registe" exact component={Registe} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
