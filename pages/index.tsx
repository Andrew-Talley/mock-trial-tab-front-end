import React from "react";
import Head from "next/head";
import { Button } from "reactstrap";
import Link from "next/link";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Mock Trial Tab</title>
      </Head>
      <h1 className="text-center">Mock Trial Tab</h1>
      <p>
        Login in the top right corner. If you're already logged in, click on
        "Team Homepage."
      </p>
    </React.Fragment>
  );
}
