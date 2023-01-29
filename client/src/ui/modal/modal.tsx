import { Toast, ToastContainer } from "react-bootstrap";

function ModalWindow({message, show}: {message: string, show: boolean}) {
    return (
      <ToastContainer position="top-end" className="p-3">
      <Toast show={show}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>

    );
  }
  
  export default ModalWindow;