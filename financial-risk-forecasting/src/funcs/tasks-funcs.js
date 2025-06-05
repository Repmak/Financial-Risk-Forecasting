
export function createTask(
    taskPrimaryKey,
    project,  // Main dict which stores all project info, and its tasks.
    taskName,
    expStartDate,
    expEndDate,
    accStartDate,
    accEndDate,
    workHours,
    //regions
    ) {
    // Check if inputs are valid.
    if (
        !isTaskNameValid(project, taskName) ||
        !areDatesValid(expStartDate, expEndDate, accStartDate, accEndDate)
    ) return null;

    const newTask = {
            id: taskPrimaryKey,
            name: taskName,
            expStartDate: new Date(expStartDate),
            expEndDate: new Date(expEndDate),
            accStartDate: new Date(accStartDate),
            accEndDate: new Date(accEndDate),
            expLeftMargin: 0,
            expWidth: 0,
            accLeftMargin: 0,
            accWidth: 0,
            workHours: workHours,
            //regions: regions,
            forecastedRisk: 0
        }

    project.tasks.push(newTask)
}

// Check if task name is already used.
export function isTaskNameValid(project, taskName) {
    for (let task of project.tasks) {
        if (task.name === taskName) return false;
    }
    return true;
}

// Check if dates (as strings) inputted are valid.
export function areDatesValid(expStartDate, expEndDate, accStartDate, accEndDate) {
    // Expected dates checks.
    if (expStartDate === null || expEndDate === null) return false;
    else if (new Date(expStartDate) > new Date(expEndDate)) return false;

    // Actual dates checks.
    if (accStartDate !== null && accEndDate !== null) return new Date(accStartDate) <= new Date(accEndDate);
    else if ((accStartDate !== null && accEndDate === null) || (accStartDate === null && accEndDate === null)) return true;

    return false;  // In the case that accStartDate undefined, but accEndDate defined.
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




