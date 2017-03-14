import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppRouter from './appRoutes.js';
// AppContainer is a necessary wrapper component for HMR

// render the HMR wrapper and entry component
const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<AppRouter />
		</AppContainer>,
		document.getElementById('app')
	);
};

render(AppRouter);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/app.js', () => {
		render(AppRouter);
	});
}
