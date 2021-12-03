import React from 'react';
//import package--goTo render
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const Route = ({ path, component }) => {
  const pathname = window.location.pathname;
  if (pathname.match(path)) {
    return (
      React.createElement(component)
    );
  } else {
    return null;
  }
};
//stateless function renders an <a> and onClick handle
const Link = ({ to, children }) => (
  <a
  /**onCLick handler "e" event object */
    onClick={(e) => {
  {/**prevents browser from making web requests ,
  children references all React elements contained in Link, goTo class App */}
      e.preventDefault();
      history.push(to);
    }}
    href={to}
  >
    {children}
  </a>
);
//listen() invoked every time the history stack changes
class App extends React.Component {
  componentDidMount() {
//listen subscribes to history. Now re-rendering App.
    history.listen(() => this.forceUpdate());
  }
//preventing browser from making a new request
  render() {
    return (
      <div
        className='ui text container'
      >
        <h2 className='ui dividing header'>
          Which body of water?
        </h2>

        <ul>
          <li> {/**instead of <a> use Link components using "to" props. goTo Link up */}
            <Link to='/atlantic'>
              <code>/atlantic</code>
            </Link>
          </li>
          <li>
            <Link to='/pacific'>
              <code>/pacific</code>
            </Link>
          </li>
        </ul>

        <hr />

        <Route path='/atlantic' component={Atlantic} />
        <Route path='/pacific' component={Pacific} />
      </div>
    );
  }
}

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);

export default App;
