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

  const severeCasesForImpact = 0.15 * infectionsByRequestedTimeForImpact;
  const severeCasesForSevereImpact = 0.15 * infectionsByRequestedTimeForSevereImpact;

  const bedAvaliable = 0.35 * data.totalHospitalBeds;

  const hospitalBedsForImpact = Math.trunc(bedAvaliable - severeCasesForImpact);
  const hospitalBedsForSevereImpact = Math.trunc(bedAvaliable - severeCasesForSevereImpact);

  const casesForICUForImpact = 0.05 * infectionsByRequestedTimeForImpact;
  const casesForICUForSevereImpact = 0.05 * infectionsByRequestedTimeForSevereImpact;

  const casesForVentilatorsImpact = 0.02 * infectionsByRequestedTimeForImpact;
  const casesForVentilatorsSevereImpact = 0.02 * infectionsByRequestedTimeForSevereImpact;

  const income = data.region.avgDailyIncomeInUSD;
  const population = data.region.avgDailyIncomePopulation;

  const dollarsImpact = (infectionsByRequestedTimeForImpact * population * income * 30).toFixed(2);
  const dollars = (infectionsByRequestedTimeForSevereImpact * population * income * 30).toFixed(2);
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedForImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeForImpact,
      severeCasesByRequestedTime: severeCasesForImpact,
      hospitalBedsByRequestedTime: hospitalBedsForImpact,
      casesForICUByRequestedTime: casesForICUForImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsImpact,
      dollarsInFlight: dollarsImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedForSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeForSevereImpact,
      severeCasesByRequestedTime: severeCasesForSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsForSevereImpact,
      casesForICUByRequestedTime: casesForICUForSevereImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsSevereImpact,
      dollarsInFlight: dollars
    }
  };
};

export default covid19ImpactEstimator;
