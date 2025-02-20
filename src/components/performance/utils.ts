
import { ExamStep } from "./types";

export const getScoreStatus = (score: number, targetScore: number, examStep: ExamStep, passingStandard = 196) => {
  if (examStep === 'step1') {
    if (score >= passingStandard) {
      return "Your predicted score meets the passing standard";
    }
    return "Your predicted score is below the passing standard";
  }
  if (score > targetScore) {
    return "Your predicted score exceeds your target score";
  } else if (score === targetScore) {
    return "Your predicted score meets your target score";
  } else {
    return "Your predicted score is lower than your target score";
  }
};

export const getScoreColor = (score: number, targetScore: number, examStep: ExamStep) => {
  if (examStep === 'step1') {
    if (score >= 210) return "text-[#019444]";
    if (score >= 196) return "text-[#FFC107]";
    return "text-[#ED1B24]";
  } else {
    if (score >= targetScore) return "text-[#019444]";
    if (score >= 230) return "text-[#8DC641]";
    if (score >= 214) return "text-[#FFC107]";
    return "text-[#ED1B24]";
  }
};

export const getBackgroundColor = (score: number, targetScore: number, examStep: ExamStep) => {
  if (examStep === 'step1') {
    if (score >= 210) return "bg-[#019444]/15";
    if (score >= 196) return "bg-[#FFC107]/15";
    return "bg-[#ED1B24]/15";
  } else {
    if (score >= targetScore) return "bg-[#019444]/15";
    if (score >= 230) return "bg-[#8DC641]/15";
    if (score >= 214) return "bg-[#FFC107]/15";
    return "bg-[#ED1B24]/15";
  }
};

export const getSegments = (range: ScoreRange, targetScore: number, examStep: ExamStep) => {
  if (examStep === 'step1') {
    return [{
      score: range.min,
      color: "bg-[#ED1B24]",
      label: `${Math.round(range.min)}`
    }, {
      score: 196,
      color: "bg-[#FFC107]",
      label: ""
    }, {
      score: 210,
      color: "bg-[#019444]",
      label: ""
    }, {
      score: range.max,
      label: `${Math.round(range.max)}`
    }];
  } else {
    return [{
      score: range.min,
      color: "bg-[#ED1B24]",
      label: `${Math.round(range.min)}`
    }, {
      score: 214,
      color: "bg-[#FFC107]",
      label: "Passing standard: 214"
    }, {
      score: 230,
      color: "bg-[#8DC641]",
      label: "230"
    }, {
      score: targetScore,
      color: "bg-[#019444]",
      label: `${targetScore}`
    }, {
      score: range.max,
      label: `${Math.round(range.max)}`
    }];
  }
};
