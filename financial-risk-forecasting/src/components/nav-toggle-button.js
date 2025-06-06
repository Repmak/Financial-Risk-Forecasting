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


const NavToggleButton = ({ setNewMode }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        if (!isToggled) {
            setIsToggled(prev => !prev);

            // Send the selected mode back to App.js.
            setNewMode(0);
        }
    }

    return (
        <div>
            {/*0: Select tool.*/}
            <button onClick={handleToggle}>
                <SelectIcon className={isToggled ? "toggled" : ""} />
            </button>

            {/*/!*1: Add task.*!/*/}
            <button onClick={handleToggle}>
                <AddIcon className={isToggled ? "toggled" : ""} />
            </button>

            {/*/!*2: Remove task.*!/*/}
            <button onClick={handleToggle}>
                <RemoveIcon className={isToggled ? "toggled" : ""} />
            </button>

            {/*/!*3: Dependency.*!/*/}
            <button onClick={handleToggle}>
                <DependencyIcon className={isToggled ? "toggled" : ""} />
            </button>

            {/*/!*4: Generate forecasted risks.*!/*/}
            <button onClick={handleToggle}>
                <GenerateRiskIcon className={isToggled ? "toggled" : ""} />
            </button>

            {/*/!*5: Save.*!/*/}
            <button onClick={handleToggle}>
                <SaveIcon className={isToggled ? "toggled" : ""} />
            </button>
        </div>
    );
};

export default NavToggleButton;
