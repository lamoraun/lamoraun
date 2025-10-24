import React from 'react';

import './style.scss';

export type HomePageProps = {

}

const HomePage: React.FC<HomePageProps> = () => {
	return (
		<div className="index"></div>
	);
}

HomePage.displayName = 'HomePage';

export default React.memo(HomePage);
