
// Normal distribution parameters
export const MEAN_SCORE = 249; // μ (mu)
export const STD_DEV = 50;    // σ (sigma)

// Error function approximation
export const erf = (x: number): number => {
  const t = 1.0 / (1.0 + 0.3275911 * Math.abs(x));
  const p = 0.254829592;
  const b = -0.284496736;
  const h = 1.421413741;
  const q = -1.453152027;
  const d = 1.061405429;
  
  const calculation = 1.0 - (p * t + b * t ** 2 + h * t ** 3 + q * t ** 4 + d * t ** 5) * Math.exp(-x * x);
  return x >= 0 ? calculation : -calculation;
};

// Normal distribution function
export const normalDistribution = (x: number, mean: number, stdDev: number): number => {
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  return coefficient * Math.exp(exponent);
};

// Generate data points for visualization
export const generateDistributionData = () => {
  const points = [];
  const numPoints = 1000;
  
  for (let score = 0; score <= 300; score += (300 / numPoints)) {
    const density = normalDistribution(score, MEAN_SCORE, STD_DEV);
    const zScore = (score - MEAN_SCORE) / STD_DEV;
    const percentile = (1 + erf(zScore / Math.sqrt(2))) / 2;
    
    points.push({
      score: Math.round(score * 100) / 100,
      density: density * 2000,
      percentile: percentile * 100
    });
  }
  
  return points;
};

// Calculate percentile for a given score
export const findPercentile = (score: number) => {
  const zScore = (score - MEAN_SCORE) / STD_DEV;
  const percentile = Math.round((1 + erf(zScore / Math.sqrt(2))) / 2 * 100);
  return percentile;
};
