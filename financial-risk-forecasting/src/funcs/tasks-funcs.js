export function createTask(
    taskPrimaryKey,
    project,  // Main dict which stores all project info, and its tasks.
    taskData
    ) {

    const newTask = {
            id: taskPrimaryKey,
            name: taskData[0],
            expStartDate: new Date(taskData[1]),
            expEndDate: new Date(taskData[2]),
            accStartDate: null,
            accEndDate: null,
            expLeftMargin: 0,
            expWidth: 0,
            accLeftMargin: 0,
            accWidth: 0,
            expCost: taskData[3],
            accCost: 0,
            workHours: 0,
            //regions: regions,
            forecastedRisk: 0
        }

    project.tasks.push(newTask)
}


//
export function editTask(
    project,
    taskName,
    expStartDate,
    expEndDate,
    accStartDate,
    accEndDate,
    workHours,
    //regions
    ) {
    return null;
}




