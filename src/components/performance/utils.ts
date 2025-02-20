
import { ExamStep } from "./types";

export const getScoreStatus = (currentScore: number, targetScore: number, examStep: ExamStep, passingStandard = 196) => {
  if (examStep === 'step1') {
    if (currentScore >= passingStandard) {
      return "Your predicted score meets the passing standard";
    }
    return "Your predicted score is below the passing standard";
  }
  if (currentScore > targetScore) {
    return "Your predicted score exceeds your target score";
  } else if (currentScore === targetScore) {
    return "Your predicted score meets your target score";
  } else {
    return "Your predicted score is lower than your target score";
  }
};

export const getScoreColor = (currentScore: number, targetScore: number, examStep: ExamStep) => {
  if (examStep === 'step1') {
    if (currentScore >= 210) return "text-[#019444]";
    if (currentScore >= 196) return "text-[#FFC107]";
    return "text-[#ED1B24]";
  } else {
    if (currentScore >= targetScore) return "text-[#019444]";
    if (currentScore >= 230) return "text-[#8DC641]";
    if (currentScore >= 214) return "text-[#FFC107]";
    return "text-[#ED1B24]";
  }
};

export const getBackgroundColor = (currentScore: number, targetScore: number, examStep: ExamStep) => {
  if (examStep === 'step1') {
    if (currentScore >= 210) return "bg-[#019444]/15";
    if (currentScore >= 196) return "bg-[#FFC107]/15";
    return "bg-[#ED1B24]/15";
  } else {
    if (currentScore >= targetScore) return "bg-[#019444]/15";
    if (currentScore >= 230) return "bg-[#8DC641]/15";
    if (currentScore >= 214) return "bg-[#FFC107]/15";
    return "bg-[#ED1B24]/15";
  }
};
