import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

const App = () => {
  const responseGoogleLogin = (response) => {
    console.log(response);
  };
  const responsErrorLogin = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    //secret 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
    //https://developers.google.com/oauthplayground
    //refresh_token 1//04SOG_bJZx6WKCgYIARAAGAQSNwF-L9IrKf2An2oi1Bk0Qf7Uw4T1QdqXCDnDhtsyUO4EWkycqayw-4wVH6pa-M3VInhI4hLot-c
    <div>
      <h1>Google Login</h1>
      <GoogleLogin
        clientId='779648521547-gjlsus2l9aud4kosqdtc5gu5icmumqlp.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogleLogin}
        onFailure={responsErrorLogin}
        cookiePolicy={'single_host_origin'}
      />
      <h1>Facebook login</h1>
      <FacebookLogin
        appId='1361830480968717'
        autoLoad={false}
        fields='name,email,picture'
        // onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  );
};

export default App;
