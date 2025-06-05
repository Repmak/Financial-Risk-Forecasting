
// Finds the smallest and largest dates.
export function getBoundaryDates(expStartDates, expEndDates, accStartDates, accEndDates) {
    let smallestDate = new Date(8640000000000000);
    let largestDate = new Date(-8640000000000000);
    const allDates = [...expStartDates, ...expEndDates, ...accStartDates, ...accEndDates];

    for (let date of allDates) {
        if (date < smallestDate) smallestDate = date;
        if (date > largestDate) largestDate = date;
    }

    return {smallestDate, largestDate};
}

// Scales the expected start/end and actual start/end dates for a task for it to be placed on the timeline.
export function getScaledDatePercentages(smallestDate,
                                         boundaryDatesDifference,
                                         expStartDate,
                                         expEndDate,
                                         accStartDate,
                                         accEndDate
) {
    const expLeftMargin = (100 * (expStartDate - smallestDate) / boundaryDatesDifference).toFixed(3);
    const expWidth = (100 * (expEndDate - expStartDate + 1) / boundaryDatesDifference).toFixed(3);
    const accLeftMargin = (100 * (accStartDate - smallestDate) / boundaryDatesDifference).toFixed(3);
    const accWidth = (100 * (accEndDate - accStartDate + 1) / boundaryDatesDifference).toFixed(3);

    return {expLeftMargin, expWidth, accLeftMargin, accWidth}
}

// Sorts the tasks in ascending order (in terms of their expected start dates).
export function sortTasksAscending(tasks) {
    // some fuck ass sorting algorithm here
    return tasks;
}

