const covid19ImpactEstimator = (data) => {
  const { periodType, reportedCases } = data;

  const currentlyInfected = reportedCases * 10;

  const projectedInfection = () => {
    let currentInfectionsByRequestedTime;
    switch (periodType) {
      case 'Days':
        currentInfectionsByRequestedTime = Math.floor((currentlyInfected * 512) / 3);
        break;
      case 'weeks':
        currentInfectionsByRequestedTime = Math.floor((currentlyInfected * 512) / 7);
        break;
      case 'months':
        currentInfectionsByRequestedTime = Math.floor((currentlyInfected * 1024) / 30);
        break;

      default:
        currentInfectionsByRequestedTime = null;
    }

    return currentInfectionsByRequestedTime;
  };

  // const infectionsByRequestedTime = projectedInfection();

  return {
    data,
    impact: {
      currentlyInfected: reportedCases * 10,
      infectionsByRequestedTime: projectedInfection
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime: projectedInfection
    }
  };
};

export default covid19ImpactEstimator;
