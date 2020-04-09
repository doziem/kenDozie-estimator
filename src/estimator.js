const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;

  const currentlyInfected = reportedCases * 10;
  const projectedInfection = () => {
    let currentInfectionsByRequestedTime;

    if (periodType === 'months') {
      // eslint-disable-next-line no-undef
      currentlyInfectionsByRequestedTime = Math.floor(timeToElapse * 30) / 3;
    }

    if (periodType === 'weeks') {
      // eslint-disable-next-line no-undef
      currentlyInfectionsByRequestedTime = Math.floor(timeToElapse * 7) / 3;
    }
    return currentInfectionsByRequestedTime;
  };

  // const infectionsByRequestedTime = projectedInfection();

  return {
    data: reportedCases,
    impact: {
      currentlyInfected: reportedCases * 10,
      infectionsByRequestedTime: projectedInfection * currentlyInfected
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime: projectedInfection * currentlyInfected
    }
  };
};

export default covid19ImpactEstimator;
