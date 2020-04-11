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

  const casesForICUForImpact = Math.trunc(0.05 * infectionsByRequestedTimeForImpact);
  const casesForICUForSevereImpact = Math.trunc(0.05 * infectionsByRequestedTimeForSevereImpact);

  const casesForVentilatorsImpact = Math.trunc(0.02 * infectionsByRequestedTimeForImpact);
  const casesForVentilatorsSevImpact = Math.trunc(0.02 * infectionsByRequestedTimeForSevereImpact);

  const inc = data.region.avgDailyIncomeInUSD;
  const pop = data.region.avgDailyIncomePopulation;

  const dollarImpact = Math.trunc((infectionsByRequestedTimeForImpact * pop * inc) / days);
  const dollar = Math.trunc((infectionsByRequestedTimeForSevereImpact * pop * inc) / days);
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedForImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeForImpact,
      severeCasesByRequestedTime: severeCasesForImpact,
      hospitalBedsByRequestedTime: hospitalBedsForImpact,
      casesForICUByRequestedTime: casesForICUForImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsImpact,
      dollarsInFlight: dollarImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedForSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeForSevereImpact,
      severeCasesByRequestedTime: severeCasesForSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsForSevereImpact,
      casesForICUByRequestedTime: casesForICUForSevereImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsSevImpact,
      dollarsInFlight: dollar
    }
  };
};

export default covid19ImpactEstimator;
