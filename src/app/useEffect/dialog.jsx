import { useState } from 'react';
import ModalDialog from './dialog-child';
import { Button } from 'antd';

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}> Open dialog </Button>

      <ModalDialog isOpen={show}>
        Hello there!
        <br />
        <button onClick={() => setShow(false)}>Close</button>
      </ModalDialog>
    </>
  );
}
