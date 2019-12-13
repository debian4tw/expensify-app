// higher order component - renders another component
// Reuse code
// Render hijacking
// prop manipulation
// abstract state


import React from 'react';
import ReactDom from 'react-dom';


const Info = (props) => (
  <div>
    <h1>Info {props.info}</h1>
  </div>
);


const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info.</p>}
      <WrappedComponent {...props} />
    </div>
  )
};

const AdminInfo = withAdminWarning(Info);

const requireAutentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {
        props.isAuthenticated ?  
        (<WrappedComponent {...props} />) :
        (<p>You need to log in.</p>)
      }
    </div>
  )
};

const AuthInfo = requireAutentication(Info);


//ReactDom.render(<AdminInfo isAdmin={true} info="dsadsa" />, document.getElementById('app'));
ReactDom.render(<AuthInfo isAuthenticated={true} info="dsadsa" />, document.getElementById('app'));