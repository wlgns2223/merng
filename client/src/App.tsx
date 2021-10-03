import {BrowserRouter as Router, Route } from "react-router-dom";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/auth";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Router>
      </Container>
    </AuthProvider>
  )
}

export default App;
