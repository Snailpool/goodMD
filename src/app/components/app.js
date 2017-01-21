import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './app.css';
import normalize from './normalize.css';

class App extends React.Component {
	render() {
		return (
			<div style={{ height: '90%' }}>
				<header styleName="header">
					<div styleName="logo">
						<a href="/"><h1 styleName="logo__text">GoodMD</h1></a>
					</div>
					<nav styleName="nav">
						<ul>
						<li styleName="nav__li"><Link styleName="nav__text" to="/home">編輯器</Link></li>
						<li styleName="nav__li"><Link styleName="nav__text" to="/about">其他</Link></li>
						</ul>
					</nav>
				</header>
				<section styleName="container">
					{this.props.children}
				</section>
			</div>
		);
	}
}

export default CSSModules(App, styles);
