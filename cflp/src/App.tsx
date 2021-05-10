import { MapLayer, HomePage, LoginPage } from "./pages";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none !important;
  }
  body {
    overflow: hidden;
  }
  .ant-message {
    top: 50px;
  }
`;

function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact={true}
            component={() => <Redirect to="/home" />}
          />
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={() => <LoginPage />} />
          <Route path="/application" component={() => <MapLayer />} />
          <Route path="*" component={() => <Redirect to="/home" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

document.body.style.margin = "0px";

export default App;
