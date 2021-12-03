import React from 'react';
//writing the route-

//ES6 destructuring syntax, 2 props.
const Route = ({ path, component }) => {
//instantiate pathname variable.window.location <- props of actual
//browser´s location. Pathname grabbing URL
  const pathname = window.location.pathname;
  if (pathname.match(path)) {
    return (
    //returning the component, other option possible pg 403
      React.createElement(component)
    );
  } else {
    return null;
  }
};
//this doesn't changes location of browser, but still makes
//a web request which is not ideal.
class App extends React.Component {
  render() {
    return (
      <div
        className='ui text container'
      >
        <h2 className='ui dividing header'>
          Which body of water?
        </h2>

        <ul>
          <li>
            <a href='/atlantic'>
              <code>/atlantic</code>
            </a>
          </li>
          <li>
            <a href='/pacific'>
              <code>/pacific</code>
            </a>
          </li>
        </ul>

        <hr />
{/**Route component */}
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
