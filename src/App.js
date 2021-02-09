import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CourseDetails from './components/CourseDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/course/:name' component={CourseDetails} />
      </Switch>
    </Router>
  );
}

export default App;
