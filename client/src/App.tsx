import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import {BrowserRouter as Router, Route } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/auth";
import AuthRoute from "./pages/AuthRouter";
import SinglePost from "./components/SinglePost";

function App() {

  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar/>
          <Route exact path="/" component={Home}/>
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePost}/>
        </Router>
      </Container>
    </AuthProvider>
  )
}

export default App;
