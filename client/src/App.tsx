import {BrowserRouter as Router, Route } from "react-router-dom";

import MenuBar from "./components/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "semantic-ui-css/semantic.min.css";


function App() {
  return (
    <Router>
      <MenuBar/>
      <Route exct path="/" component={Home}/>
      <Route exct path="/login" component={Login}/>
      <Route exct path="/register" component={Register}/>
    </Router>
  )
}

export default App;
