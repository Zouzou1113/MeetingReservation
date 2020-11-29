import * as React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';


const WithMainlayout = (WrappedComponent: any) => (props: any) :JSX.Element => {
  return (
    <>
     <Header />
     <Container>
        <WrappedComponent {...props} />
      </Container>
    </>
  );
};

export default WithMainlayout;