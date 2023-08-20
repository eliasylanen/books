import { FC, PropsWithChildren } from 'react';
import './Container.css';

export const Container: FC<PropsWithChildren> = ({ children }) => {
	return <section className="container">{children}</section>;
};
