import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Container, Content, Footer} from 'bloomer';
import 'bulma/css/bulma.css';
import SimpleReactLightbox from "simple-react-lightbox";
import Home from "./components/Home";
import OnlyProject from "./components/OnlyProject";
import Page404 from "./components/Page404";
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
const client = new ApolloClient({uri: 'https://piotr.cf:3307/graphql'});

class App extends React.Component{
    render() {
        return(
            <Router hitory={history}>
                <SimpleReactLightbox>
                    <Switch>
                        <Route path="/project/:slug">
                            <OnlyProject />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route>
                            <Page404 />
                        </Route>
                    </Switch>
                    <Footer id='footer' style={{marginTop: 30}}>
                        <Container>
                            <Content>
                                <code>Made by Piotr ;D</code>
                            </Content>
                        </Container>
                    </Footer>
                </SimpleReactLightbox>
            </Router>
        );
    }
}

ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById('root'));
serviceWorker.register();
