

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

export function areExpDatesValid(expStartDate, expEndDate) {
    if (expStartDate === null || expEndDate === null) return false;
    return new Date(expStartDate) <= new Date(expEndDate);
}

export function isExpCostValid(expCost) {
    return Math.sign(expCost) !== -1;
}