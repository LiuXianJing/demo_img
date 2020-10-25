import React from 'react';
import { BrowserRouter as Router, Route, Switch , } from "react-router-dom"

import ImgContent from "../ImgContent";
import PostDetail from "../PostDetail";

const App = () => {

  return (
    <div >
      <Router>
        <Switch>
        <Route exact path="/" component={ImgContent}></Route> 
        <Route path="/post/:_uid" component={PostDetail}></Route> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
