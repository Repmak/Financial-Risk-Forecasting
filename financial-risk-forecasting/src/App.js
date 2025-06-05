import './style sheets/main.css';
import './style sheets/gantt-chart styles.css';
import './funcs/tasks-funcs.js';
import './funcs/timeline-funcs.js';
import './overlays/create-task';
import {useState} from "react";
import CreateTaskOverlay from "./overlays/create-task";
import {createTask} from "./funcs/tasks-funcs";


const App = () => {
    const [createTaskOverlay, setCreateTaskOverlay] = useState(false);

    const [boundaryDates, setBoundaryDates] = useState({
        smallestDate: new Date(-8640000000000000),
        largestDate: new Date(8640000000000000),
        difference: new Date(0),
    });

    let [taskPrimaryKey, setTaskPrimaryKey] = useState(0)  // WE NEED TO UPDATE THIS (+1) WHEN ITS PASSED INTO createTask

    const [project, setProject] = useState({
        "projectName": "New Project",
        "lastSavedLocally": null,  //  new Date().toISOString().slice(0, 19) for when saving data
        "tasks": []
    });

    const handleCreateTask = (taskData) => {
        if (createTask(taskPrimaryKey, project, taskData) === null) console.log("problem creating task");
        else taskPrimaryKey ++;

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

            <div className="gantt-chart">
                {project.tasks.map((task) => (
                    // key bs to review https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905
                    <div className="gantt-chart-row" key={task.id}>

                        <div className="task-names">{task.name}</div>

                        <div className="timeline">
                            {task.expStartDate} → {task.expEndDate}
                        </div>

                        <div className="forecasted-risk">
                            {task.forecastedRisk}
                        </div>

                    </div>
                ))}

                {/*Extra row for creating a task.*/}
                <div className="gantt-chart-row">
                    <div className="task-names">
                        <button onClick={() => setCreateTaskOverlay(true)}>
                            Create task
                        </button>
                    </div>

                    <div className="timeline">
                        empty
                    </div>

                    <div className="forecasted-risk">
                        empty
                    </div>
                </div>
            </div>

        </div>
    );
};

export default App;
