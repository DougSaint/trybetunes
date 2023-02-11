import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="notfound">
        <h1>404 Error: Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <iframe
          src="https://giphy.com/embed/9J7tdYltWyXIY"
          width="480"
          height="404"
          title="notfound gif"
        />
      </div>
    );
  }
}

export default NotFound;
