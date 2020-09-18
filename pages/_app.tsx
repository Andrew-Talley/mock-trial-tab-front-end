import "../styles/globals.css";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { HeaderBar } from "components/header-bar";
import { withMTUrqlClient } from "helpers/withMTUrqlClient";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <HeaderBar />
      <Container>
        <Component {...pageProps} />
      </Container>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        closeOnClick
        newestOnTop
      />
    </React.Fragment>
  );
}

export default withMTUrqlClient(MyApp);
