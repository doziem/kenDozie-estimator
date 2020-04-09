const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType } = data;

  const currentlyInfectedForImpact = reportedCases * 10;
  const currentlyInfectedForSevereImpact = reportedCases * 50;

  if (periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (periodType === 'months') {
    data.timeToElapse *= 30;
  }
  const factor = Math.trunc(data.timeToElapse) / 3;
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
