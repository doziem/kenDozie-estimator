const covid19ImpactEstimator = (data) => {
  const currentlyInfectedForImpact = data.reportedCases * 10;
  const currentlyInfectedForSevereImpact = data.reportedCases * 50;

  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }
  const days = data.timeToElapse;
  const factor = Math.trunc(days / 3);
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
