const Modal = ({ closeModal, children }) => {
    return (
        <div className={"modal-container"}>
            <div className="overlay" onClick={closeModal}>

            </div>
            <div className="modal-content">

                <div className="modal-header">
                    <a href="#" onClick={closeModal}>
                        X
                    </a>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;