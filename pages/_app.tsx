import "../styles/globals.css";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-toastify/dist/ReactToastify.css";
import "react-mde/lib/styles/css/react-mde-all.css";

import React, { useMemo } from "react";
import NextApp from "next/app";
import { Provider, getSession } from "next-auth/client";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { HeaderBar } from "components/header-bar";
import { withMTUrqlClient } from "helpers/withMTUrqlClient";
import { NextPage } from "next";
import { AuthContext, AuthContextType } from "../helpers/auth";

const MyApp = ({ Component, pageProps, session, userInfo }) => {
  const info: AuthContextType = userInfo ?? {
    tournament: null,
    teamNumber: null,
    name: null,
    admin: false,
  };

  return (
    <AuthContext.Provider value={info}>
      <Provider session={session}>
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
      </Provider>
    </AuthContext.Provider>
  );
};

async function getUserInfo(context) {
  const [session /* , response */] = await Promise.all([getSession(context)]);

  const [id, admin, teamNumber] =
    typeof session?.user?.email === "string"
      ? session.user.email.split("-")
      : [null, null, null];

  const userInfo = {
    name: session?.user?.name ?? null,
    id,
    admin: admin === "true",
    teamNumber: (teamNumber && parseInt(teamNumber, 10)) ?? null,
  };

  return { session, userInfo };
}

MyApp.getInitialProps = async (ctx) => {
  const [userData, appProps] = await Promise.all([
    getUserInfo(ctx.ctx),
    NextApp.getInitialProps(ctx),
  ]);

  return { ...appProps, ...userData };
};

export default withMTUrqlClient(MyApp);
