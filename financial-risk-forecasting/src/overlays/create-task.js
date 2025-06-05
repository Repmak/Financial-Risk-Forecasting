import React from 'react';

const CreateTaskOverlay = ({ onClose, onSend }) => {
    const handleSend = () => {
        onSend({ message: 'Data from overlay' });
        onClose();
    };

    return (
        <div className="overlay">
            <div className="overlay-header">
                <div className="overlay-title">
                    Create Task
                </div>
                <button onClick={onClose} className="overlay-close">
                    ✕
                </button>
            </div>

            <div className="overlay-body">
                all input boxes will go here

                <div className="overlay-confirmation-buttons">
                    <button onClick={handleSend} className="overlay-send">
                        Ok
                    </button>
                    <button onClick={onClose} className="overlay-cancel">
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CreateTaskOverlay;
