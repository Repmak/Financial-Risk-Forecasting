import React, { useState } from 'react';

// CSS styling
import '../style sheets/navigation-bar-buttons.css';

// Navigation bar icons
import { ReactComponent as SelectIcon } from '../icons/select.svg';
import { ReactComponent as AddIcon } from '../icons/add.svg';
import { ReactComponent as RemoveIcon } from '../icons/remove.svg';
import { ReactComponent as DependencyIcon } from '../icons/dependency.svg';
import { ReactComponent as GenerateRiskIcon } from '../icons/generate-risk.svg';
import { ReactComponent as SaveIcon } from '../icons/save.svg';


const NavToggleButtons = ({ setNewMode }) => {
    // Mode that is selected in the navigation bar.
    // 0: Select tool.
    // 1: Add task.
    // 2: Remove task.
    // 3: Dependency.
    // 4: Generate forecasted risks.
    // 5: Save.
    const [modeSelected, setModeSelected] = useState(0);

    const handleToggle = (newMode) => {
        setModeSelected(newMode);
        setNewMode(newMode);  // Updates the selected mode in App.js.
    }

    return (
        <div className="navigation-bar">
            {/*0: Select tool.*/}
            <button onClick={() => handleToggle(0)}>
                <SelectIcon className={(modeSelected === 0) ? "toggled" : ""} />
            </button>

            {/*1: Add task.*/}
            <button onClick={() => handleToggle(1)}>
                <AddIcon className={(modeSelected === 1) ? "toggled" : ""} />
            </button>

            {/*2: Remove task.*/}
            <button onClick={() => handleToggle(2)}>
                <RemoveIcon className={(modeSelected === 2) ? "toggled" : ""} />
            </button>

            {/*3: Dependency.*/}
            <button onClick={() => handleToggle(3)}>
                <DependencyIcon className={(modeSelected === 3) ? "toggled" : ""} />
            </button>

            {/*4: Generate forecasted risks.*/}
            <button onClick={() => handleToggle(4)}>
                <GenerateRiskIcon className={(modeSelected === 4) ? "toggled" : ""} />
            </button>

            {/*5: Save.*/}
            <button onClick={() => handleToggle(5)}>
                <SaveIcon className={(modeSelected === 5) ? "toggled" : ""} />
            </button>
        </div>
    );
};

export default NavToggleButtons;
