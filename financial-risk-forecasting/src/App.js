import './style sheets/main.css';
import './style sheets/timeline styles.css';
import './funcs/tasks-funcs.js';
import './funcs/timeline-funcs.js';
import './components/create-task';
import {useState} from "react";

// Functions
import {createTask} from "./funcs/tasks-funcs";
import {getBoundaryDates, getScaledDatePercentages} from "./funcs/timeline-funcs";

// Components
import CreateTaskOverlay from "./components/create-task";
import NavToggleButton from "./components/nav-toggle-button.js";

const App = () => {

    // Mode that is selected in the navigation bar.
    // 0: Select tool.
    // 1: Add task.
    // 2: Remove task.
    // 3: Dependency.
    // 4: Generate forecasted risks.
    // 5: Save.
    const [modeSelection, setModeSelection] = useState(0);

    const [createTaskOverlay, setCreateTaskOverlay] = useState(false);

    const [lastSavedLocally, setLastSavedLocally] = useState("");

    const [boundaryDates, setBoundaryDates] = useState({
        smallestDate: new Date(-8640000000000000),
        largestDate: new Date(8640000000000000)
    });

    let [taskPrimaryKey, setTaskPrimaryKey] = useState(0)

    const [project, setProject] = useState({
        "projectName": "New Project",
        "lastSavedLocally": null,  //  new Date().toISOString().slice(0, 19) for when saving data
        "tasks": []
    });

    const handleCreateTask = (taskData) => {
        // Add task to project.tasks array.
        createTask(taskPrimaryKey, project, taskData);
        setTaskPrimaryKey(prev => prev + 1);
        // Now update the boundary dates and scale timeline if required.
        const newBoundaryDates = getBoundaryDates(project.tasks);
        if (
            newBoundaryDates.smallestDate !== boundaryDates.smallestDate ||
            newBoundaryDates.largestDate !== boundaryDates.largestDate) {

            setBoundaryDates(newBoundaryDates);

            // Readjust the scaling of all projects on the timeline if the boundary dates have changed.
            getScaledDatePercentages(
                newBoundaryDates.smallestDate,  // Use newBoundaryDates since boundaryDates is still set to its previous state.
                newBoundaryDates.largestDate,  // Use newBoundaryDates since boundaryDates is still set to its previous state.
                project.tasks
            );
        }

        console.log(boundaryDates);

        for (let task of project.tasks) {
            console.log(task)
        }
    };

    return (
        <div>
            {createTaskOverlay && (
                <CreateTaskOverlay
                    onClose={() => setCreateTaskOverlay(false)}
                    onSend={handleCreateTask}
                />
            )}

            <header>
                My Project - Not saved locally
            </header>

            <div className="body-grid">
                <div className="navigation-bar">
                    <NavToggleButton
                        setNewMode={setModeSelection}
                    />
                </div>

                <div className="timeline">
                    {project.tasks.map((task) => (
                        <div className="task-timeline-box" style={{
                            marginLeft: task.expLeftMargin + "%",
                            width: task.expWidth + "%"
                        }}>
                            {task.expStartDate.toISOString().slice(0, 10)} → {task.expEndDate.toISOString().slice(0, 10)}
                        </div>
                    ))}
                </div>
            </div>

            {/*<div className="gantt-chart">*/}
            {/*    {project.tasks.map((task) => (*/}
            {/*        // key bs to review https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905*/}
            {/*        <div className="gantt-chart-row" key={task.id}>*/}

            {/*            <div className="task-names">{task.name}</div>*/}

            {/*            <div className="timeline">*/}
            {/*            <div className="task-timeline-box" style={{*/}
            {/*                    marginLeft: task.expLeftMargin + "%",*/}
            {/*                    width: task.expWidth + "%"*/}
            {/*                }}>*/}
            {/*                    {task.expStartDate.toISOString().slice(0, 10)} → {task.expEndDate.toISOString().slice(0, 10)}*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="task-forecasted-risk">*/}
            {/*                {task.forecastedRisk}*/}
            {/*            </div>*/}

            {/*        </div>*/}
            {/*    ))}*/}

            {/*    /!*Extra row for creating a task.*!/*/}
            {/*    <div className="gantt-chart-row">*/}
            {/*        <div className="task-names">*/}
            {/*            <button onClick={() => setCreateTaskOverlay(true)}>*/}
            {/*                Create task*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*        <div className="timeline">*/}
            {/*            empty*/}
            {/*        </div>*/}

            {/*        <div className="forecasted-risk">*/}
            {/*            empty*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
};

export default App;
