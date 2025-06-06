import React from 'react';
import {useState} from "react";
import '../funcs/create-task-validation.js';
import {areExpDatesValid, isExpCostValid} from "../funcs/create-task-validation";

const CreateTaskOverlay = ({ onClose, onSend }) => {

    const [taskName, setTaskName] = useState("");
    const [expStartDate, setExpStartDate] = useState("");
    const [expEndDate, setExpEndDate] = useState("");
    const [expCost, setExpCost] = useState(0);

    const handleSend = () => {
        // Task validation before sending data.
        if (areExpDatesValid(expStartDate, expEndDate) && isExpCostValid(expCost)) {
            onSend([taskName, expStartDate, expEndDate, expCost]);
            onClose();
        }
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

                <div className="input-div">
                    Task name <span>(required)</span>
                    <input className="entry-input" type="text" value={taskName}
                           onChange={(e) => setTaskName(e.target.value)} placeholder="Task name"/>
                </div>

                <div className="input-div">
                    Expected start date <span>(required)</span>
                    <input className="entry-input" type="date" value={expStartDate}
                           onChange={(e) => setExpStartDate(e.target.value)}/>
                </div>

                <div className="input-div">
                    Expected end date <span>(required)</span>
                    <input className="entry-input" type="date" value={expEndDate}
                           onChange={(e) => setExpEndDate(e.target.value)}/>
                </div>

                <div className="input-div">
                    Expected cost (£) <span>(required)</span>
                    <input className="entry-input" type="text" value={expCost}
                           onChange={(e) => setExpCost(e.target.value)}/>
                </div>

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
