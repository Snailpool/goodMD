import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './about.css';

class About extends React.Component {
	render() {
		return (
			<div>這裡還真沒有什麼東西</div>
		);
	}
}
export default CSSModules(About, styles);
