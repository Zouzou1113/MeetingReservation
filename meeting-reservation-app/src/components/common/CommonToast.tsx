
import * as React from 'react';
import {Toast } from 'react-bootstrap';

interface ToastProps {
    contentBody: string;
    contentTitle:string;
    display: boolean;
    onClose: () => void;
}
const CommonToast: React.FC<ToastProps> = ({ contentBody, contentTitle, display, onClose}) => {

    return (
      <div  aria-live="polite" aria-atomic="true"
            style={{
              minHeight: '100px',
            }}
          >
          <Toast   
            style={{ position: 'absolute', top: 0, right: 0, }} 
            onClose={onClose} show={display} delay={3000} autohide>
            <Toast.Header >
              <strong className="mr-auto">{contentTitle}</strong>
            </Toast.Header>
            <Toast.Body>{contentBody}</Toast.Body>
          </Toast>
      </div>
      );
};

export default CommonToast;
