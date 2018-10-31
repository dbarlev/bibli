import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

import './App.css';

class RedirectTo extends Component {

  constructor(props)
  {
      super(props);
      this.state = {
          allowRedirect: this.props.allowRedirect
      }
  }

  componentWillReceiveProps(nextProps){
      this.setState({
          redirectTo: nextProps.url,
          allowRedirect: nextProps.allowRedirect
      })
  }

  redirect() {
      let {allowRedirect, redirectTo} = this.state;

      if(allowRedirect && redirectTo != null)
      {
            return <Redirect to={redirectTo} /> 
      }
  }

  render() {
    return (
      <div className="RedirectTo">
            {
                this.redirect()
            }     
      </div>
    );
  }
}

export default RedirectTo;
