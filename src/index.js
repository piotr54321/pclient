import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory }                   from 'history';
import ApolloClient                               from 'apollo-boost';
import { ApolloProvider }                         from 'react-apollo';
import { Container, Content, Footer }             from 'bloomer';
import SimpleReactLightbox                        from "simple-react-lightbox";
import Home                                       from "./components/Home";
import OnlyProject                                from "./components/OnlyProject";
import Page404                                    from "./components/Page404";
import * as serviceWorker                         from './serviceWorker';
import { I18nextProvider, Trans }                 from "react-i18next";
import i18next                                    from "i18next";
import translation_pl                             from "./translations/pl/site.json";
import translation_en                             from "./translations/pl/site.json";

import 'bulma/css/bulma.css';

i18next.init ({
	interpolation: {escapeValue: false},
	lng: 'pl',
	resources: {
		pl: {
			translation: translation_pl
		},
		en: {
			translation: translation_en
		}
	}
});

const history = createBrowserHistory ();
const client = new ApolloClient ({uri: 'https://piotr.cf:3307/graphql'});

class App extends React.Component {
	render() {
		return (
			<Router hitory={history}>
				<I18nextProvider i18n={i18next}>
					<SimpleReactLightbox>
						<Switch>
							<Route path="/project/:slug">
								<OnlyProject/>
							</Route>
							<Route exact path="/">
								<Home/>
							</Route>
							<Route>
								<Page404/>
							</Route>
						</Switch>
						<Footer id='footer' style={{marginTop: 30}}>
							<Container>
								<Content>
									<code><Trans i18nKey="main.created_by"/></code>
								</Content>
							</Container>
						</Footer>
					</SimpleReactLightbox>
				</I18nextProvider>
			</Router>
		);
	}
}

ReactDOM.render (<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById ('root'));
serviceWorker.register ();
