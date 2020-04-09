const covid19ImpactEstimator = (data) => {
    const { reportedCases, timeToElapse, periodType } = data;

    const currentlyInfectedForImpact = reportedCases * 10;
    const currentlyInfectedForSevereImpact = reportedCases * 50;

    switch (periodType) {
        case 'weeks':
            timeToElapse *= 7;
            break;
        case 'months':
            timeToElapse *= 7;
            break;
    }

    const factor = Math.trunc(timeToElapse) / 3;
    const infectionsByRequestedTimeForImpact = currentlyInfectedForImpact * (2 ** factor);
    const infectionsByRequestedTimeForSevereImpact = currentlyInfectedForSevereImpact * (2 ** factor);

    return {
        data,
        impact: {
            currentlyInfected: currentlyInfectedForImpact,
            infectionsByRequestedTime: infectionsByRequestedTimeForImpact
        },
        severeImpact: {
            currentlyInfected: currentlyInfectedForSevereImpact,
            infectionsByRequestedTime: infectionsByRequestedTimeForSevereImpact
        }
    };
};

export default covid19ImpactEstimator;
