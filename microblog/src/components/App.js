import React from 'react';
import './App.css';
import NewPost from './NewPost';
import Home from './Home';
import Post from './Post';
import { Route, NavLink, Switch } from 'react-router-dom';

/** Overall blog application: 
 * 
 * - shows header, nav links, and contains routes to:
 *  - new form
 *  - homepage
 *  - individual posts
 */
function App() {
  return (
    <div className='App container'>
      <header className='App-header jumbotron mt-2'>
        <h1 className='App-title display-4'>Microblog</h1>
        <div className='lead'>Get in the Rithm of blogging!</div>
        <nav>
          <NavLink exact to="/">Blog</NavLink>
          <NavLink exact to="/new">Add a new post</NavLink>
        </nav>
      </header>

      <Switch>
        <Route exact path="/new">
          <NewPost />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:postId">
          <Post />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
