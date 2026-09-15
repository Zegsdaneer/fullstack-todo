import Button from "../Buttons/Button";
import './Modal.css'


interface ModalProps {
    isItOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

function Modal({isItOpen, onClose, children}: ModalProps){

    if(!isItOpen){
        return null;
    }

    return (
       <div className="modal">
        <h1 className="modal_title">Edit Todo</h1>
        {children}
        <Button type="button" size="lg" ><i className="ri-close-line" onClick={onClose}></i></Button>
       </div>
    )
}

export default Modal;