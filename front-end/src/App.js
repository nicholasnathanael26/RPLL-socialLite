import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./view/pages/login";
import Register from "./view/pages/register";
import Home from "./view/pages/home";
import EditProfil from "./view/pages/editprofil";
import Newpost from "./view/pages/newpost";
import newstory from "./view/pages/newstory";
import EditPost from "./view/pages/editpost";
import Profile from "./view/pages/profile";
import DirrectMessage from "./view/pages/directmessage";
import SearchAccount from "./view/pages/searchaccount";
import ForgotPassword from "./view/pages/forgotpassword";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/signup" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/" component={Home} exact />
            <Route path="/editprofile" component={EditProfil} exact />
            <Route path="/upload" component={Newpost} exact />
            <Route path="/story" component={newstory} exact />
            <Route path="/editpost/:id" component={EditPost} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/directmessage" component={DirrectMessage} exact />
            <Route path="/profile/:username" component={SearchAccount} exact />
            <Route path="/forgotpassword" component={ForgotPassword} exact />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
