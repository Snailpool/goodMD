import React from 'react';
import { Link } from 'react-router';
import styles from './app.css';
import normalize from './normalize.css';

class App extends React.Component {
	render() {
		return (
			<div style={{ height: '90%' }}>
				<header className="header">
					<div className="logo">
						<a href="/"><h1 className="logo__text">GoodMD</h1></a>
					</div>
					<nav className="nav">
						<ul>
						<li className="nav__li"><Link className="nav__text" to="/home">編輯器</Link></li>
						<li className="nav__li"><Link className="nav__text" to="/about">其他</Link></li>
						</ul>
					</nav>
				</header>
				<section className="container">
					{this.props.children}
				</section>
			</div>
		);
	}
}

export default App;
