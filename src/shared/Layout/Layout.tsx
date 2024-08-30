import { FC, PropsWithChildren } from 'react';
import { Header } from '../../widgets/header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};
