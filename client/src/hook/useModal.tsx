import { useState } from "react";
import ModalWindow from "../ui/modal/modal";

const useModal = () => {
    const [text, setText] = useState('')

    const show = text ? true : false
    
    const modal = <ModalWindow message={text} show={show}/>;

    const showModal = (text: string) => {
        setText(text)

        setTimeout(() => setText(''), 2000)
    }

    return {
        modal,
        showModal
    }

}

export default useModal;