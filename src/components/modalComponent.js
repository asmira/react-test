import { Box, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeChildModal, closeGrandChildModal, closeModal } from "../reducers/modalReducer";
import { useRef } from 'react';
import Draggable from 'react-draggable';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(0, 0, 0)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalComponent = () => {
    const { modal : {isOpen, type, title, content}} = useSelector((state)=>state.modal);
    const dispatch = useDispatch();
    const ref = useRef();
    const handleClose = ()=>{
        dispatch(closeModal())
    };

    return (
        <>
            <Draggable nodeRef={ref}>
                <Modal
                    hideBackdrop
                    open={isOpen}
                    ref={ref}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        <Box>
                        {content}
                        </Box>
                    </Box>
                </Modal>
            </Draggable>
            <ChildModal/>
        </>
    );
}

const ChildModal = (props) => {
    const { childModal : {isOpen, type, title, content}} = useSelector((state)=>state.modal);
    const dispatch = useDispatch();
    const ref2 = useRef();
    const handleClose = ()=>{
        dispatch(closeChildModal())
    };

    return (
        <>
            <Draggable nodeRef={ref2} >
                <Modal
                    hideBackdrop
                    open={isOpen}
                    ref={ref2}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        <Box>
                        {content}
                        </Box>
                    </Box>
                </Modal>
            </Draggable>
            <GrandChildModal/>
        </>
    );
}

const GrandChildModal = () =>{
    const { grandChildModal : {isOpen, type, title, content}} = useSelector((state)=>state.modal);
    const dispatch = useDispatch();
    const ref3 = useRef();
    const handleClose = ()=>{
        dispatch(closeGrandChildModal())
    };

    return (
        <>
            <Draggable nodeRef={ref3}>
                <Modal
                    hideBackdrop
                    open={isOpen}
                    ref={ref3}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        <Box>
                        {content}
                        </Box>
                    </Box>
                </Modal>
            </Draggable>
        </>
    );
}
export default ModalComponent;