import './style sheets/main.css';
import './style sheets/timeline styles.css';
import {useEffect, useState} from "react";

// Functions
import {createTask} from "./funcs/tasks-funcs";
import {getMidnightDate, getBoundaryDates, getScaledDatePercentages} from "./funcs/timeline-funcs";

// Components
import CreateTaskOverlay from "./components/create-task";
import NavToggleButtons from "./components/nav-toggle-buttons.js";

// Constants needed for initialising default tasks and dates.
const todayMidnight = getMidnightDate(new Date());
const sevenDaysLaterMidnight = getMidnightDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
const tenDaysLaterMidnight = getMidnightDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000));

const App = () => {
    // todo Repeated from nav-toggle-buttons.js !!!! ideally try to make there only be one instance of this.
    const [NavModeSelected, setNavModeSelected] = useState(0);

    const [createTaskOverlay, setCreateTaskOverlay] = useState(false);

    const [lastSavedLocally, setLastSavedLocally] = useState("");

    const [boundaryDates, setBoundaryDates] = useState(() => {
        return {
            smallestDate: todayMidnight,
            largestDate: tenDaysLaterMidnight
        };
    });

    // const [timelineDateMarkers, setTimelineDateMarkers] = useState(() => {
    //     let dateMarkers = [];
    //     const today = boundaryDates.smallestDate;
    //
    //     for (let i = 0; i < 6; i++) {
    //         const nextMonthDate = new Date(today);
    //         nextMonthDate.setMonth(nextMonthDate.getMonth() + i);
    //         nextMonthDate.setHours(0, 0, 0, 0);
    //         dateMarkers.push(nextMonthDate)
    //     }
    //
    //     return dateMarkers;
    // });

    const [timelineDateMarkers, setTimelineDateMarkers] = useState([
        todayMidnight,
        getMidnightDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)),
        getMidnightDate(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)),
        getMidnightDate(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)),
        getMidnightDate(new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)),
        getMidnightDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000))
    ]);

    // useEffect(() => {
    //     const dateMarkers = [];
    //     const today = boundaryDates.smallestDate;
    //
    //     for (let i = 0; i < 6; i++) {
    //         const nextMonthDate = new Date(today);
    //         nextMonthDate.setMonth(nextMonthDate.getMonth() + i);
    //         nextMonthDate.setHours(0, 0, 0, 0);
    //         dateMarkers.push(nextMonthDate);
    //     }
    //
    //     setTimelineDateMarkers(dateMarkers);
    // }, [boundaryDates]);

    let [taskPrimaryKey, setTaskPrimaryKey] = useState(1)  // Key set to 1 since 0 is used by the sample task.

    const [project, setProject] = useState({
        "projectName": "New Project",
        "lastSavedLocally": null,  //  new Date().toISOString().slice(0, 19) for when saving data
        "tasks": [{  // A single sample class is added by default.
            id: 0,
            name: "Task #1",
            expStartDate: todayMidnight,
            expEndDate: sevenDaysLaterMidnight,
            accStartDate: null,
            accEndDate: null,
            expLeftMargin: 0,
            expWidth: 70,  // 70% of the timeline.
            accLeftMargin: 0,
            accWidth: 0,
            expCost: 0,
            accCost: 0,
            workHours: 0,
            //regions: regions,
            forecastedRisk: 0
        }]
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
                <div className="nav-bar">
                    <NavToggleButtons
                        setNewMode={(newNavMode) => setNavModeSelected(newNavMode)}
                    />
                </div>

                <div className="timeline">
                    <div className="date-markers">
                        {timelineDateMarkers.map((dateMarker) => (
                            <div className="date-marker">
                                {dateMarker.toISOString().slice(0, 10)}
                            </div>
                        ))}
                    </div>

                    {project.tasks.map((task) => (
                        <div className="task-box" style={{
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
