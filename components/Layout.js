import Head from "next/head";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";
import { SheetsRegistry } from "jss";
import { createMuiTheme } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createGenerateClassName from "@material-ui/core/styles/createGenerateClassName";
import JssProvider from "react-jss/lib/JssProvider";
import "typeface-roboto";

const sheetsRegistry = new SheetsRegistry();

// Create a sheetsManager instance.
const sheetsManager = new Map();

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: green,
    accent: red,
    type: "light"
  }
});

const generateClassName = createGenerateClassName();

const pageJsx = (css, props, render) => {
  const styleOrNot = render ? <style>{css}</style> : <noscript />;

  return (
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <div>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no"
            />
            <meta charSet="utf-8" />
            <link rel="manifest" href="/static/manifest.json" />
            <link
              rel="shortcut icon"
              type="image/x-icon"
              href="/static/favicon.ico"
            />
            {styleOrNot}
            <title>Invoice</title>
          </Head>
          <style jsx global>{`
            body {
              margin: 0;
            }
          `}</style>
          <div>{props.children}</div>
        </div>
      </MuiThemeProvider>
    </JssProvider>
  );
};

pageJsx.propTypes = {
  children: PropTypes.node.isRequired
};

const Layout = props => {
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (render) {
      setRender(false);
    }
  });

  const div = pageJsx(null, props, render);
  ReactDOMServer.renderToString(div);

  return pageJsx(sheetsRegistry.toString(), props, render);
};

export default Layout;
