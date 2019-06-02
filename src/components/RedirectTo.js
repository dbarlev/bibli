import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

import './App.css';

class RedirectTo extends Component {

  constructor(props)
  {
      super(props);
      this.state = {
          redirect: this.props.redirect
      }
  }

  componentWillReceiveProps(nextProps){
      this.setState({
          redirect: nextProps.redirect,
          to: nextProps.to
      })
  }

  redirect() {
      let {redirect, to} = this.state;

      if(redirect)
        return <Redirect to={to} />   
  }

  render() {
    return (
        <div>
            {
                this.redirect()
            }
        </div>
    )
  }
}

export default RedirectTo;
