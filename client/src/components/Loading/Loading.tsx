import { FC } from 'react';
import './Loading.css';

// @ts-expect-error Vite issues
import { ReactComponent as LoadingIcon } from './LoadingIcon.svg';

export const Loading: FC = () => (
	<div className="loading">
		<LoadingIcon />
	</div>
);
