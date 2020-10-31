import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { apiClient } from '../../../../common/apiClient';
import { userLogedIn } from '../../../../actions';
import { getCookie } from '../../../Services/GetCookies';
import './Zcredit.scss';

const Zcredit = ({ selectedPackage, userLogedIn }) => {
  const [iframe, setIframe] = useState('not valid');
  const data = {
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username")
  }

  useEffect(() => {
    if (data.auth) {
      const { userid, auth, username } = data;
      userLogedIn({ userid, auth, username });
    }
  }, [data])

  useEffect(() => {
    if (selectedPackage) {
      (async () => {
        let serverResponse = await apiClient("/users/Credit.php", "POST", { ...data, price: selectedPackage.price });

        if (serverResponse) {
          setIframe(serverResponse);
        }
        else {
          console.log('error2', serverResponse.error);
        }
      })();
    }
  }, [selectedPackage])

  return (
    <div id="zcredit">
      {
        iframe !== "not valid" &&
        <iframe frameBorder="0" src={iframe} />
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectedPackage: state.selectedPackage
  }
}

export default connect(mapStateToProps, { userLogedIn })(Zcredit);