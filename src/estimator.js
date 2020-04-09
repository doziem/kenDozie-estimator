const covid19ImpactEstimator = (data) => {
  const reportedCases = data;

  const currentlyInfected = reportedCases * 10;

  const projectedInfection = (periodType, timeToElapse) => {
    let currentInfectionsByRequestedTime;
    switch (periodType) {
      case 'Days':
        currentInfectionsByRequestedTime = Math.floor((timeToElapse * 512) / 3);
        break;
      case 'weeks':
        currentInfectionsByRequestedTime = Math.floor((timeToElapse * 512) / 7);
        break;
      case 'months':
        currentInfectionsByRequestedTime = Math.floor((timeToElapse * 1024) / 30);
        break;

      default:
        currentInfectionsByRequestedTime = null;
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
