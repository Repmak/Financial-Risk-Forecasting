
// Finds the smallest and largest dates.
export function getBoundaryDates(tasks) {
    let smallestDate = new Date(8640000000000000);
    let largestDate = new Date(-8640000000000000);
    const allDates = [];

    for (let task of tasks) {
        if (task.expStartDate) allDates.push(new Date(task.expStartDate));
        if (task.expEndDate) allDates.push(new Date(task.expEndDate));
        if (task.accStartDate) allDates.push(new Date(task.accStartDate));
        if (task.accEndDate) allDates.push(new Date(task.accEndDate));
    }

    for (let date of allDates) {
        if (date < smallestDate) smallestDate = date;
        if (date > largestDate) largestDate = date;
    }

    return {smallestDate, largestDate};
}

// Scales the expected start/end and actual start/end dates for a task for it to be placed on the timeline.
export function getScaledDatePercentages(smallestDate, largestDate, tasks) {
    const boundaryDatesDifference = largestDate - smallestDate + 1;
    for (let task of tasks) {
        task.expLeftMargin = (100 * (task.expStartDate - smallestDate) / boundaryDatesDifference).toFixed(3);
        task.expWidth = (100 * (task.expEndDate - task.expStartDate + 1) / boundaryDatesDifference).toFixed(3);
        task.accLeftMargin = (100 * (task.accStartDate - smallestDate) / boundaryDatesDifference).toFixed(3);
        task.accWidth = (100 * (task.accEndDate - task.accStartDate + 1) / boundaryDatesDifference).toFixed(3);
    }
}

// Sorts the tasks in ascending order (in terms of their expected start dates).
export function sortTasksAscending(tasks) {
    // some fuck ass sorting algorithm here
    return tasks;
}

