export interface FormInputs {
  environment: string;
  crackType: string;
  concreteClass: string;
  barDiameter: number;
  exposureClass: string;
  designWorkingLife: number;
  compactCover: boolean;
  cementType: string;
}

export interface CalculationResult {
  baelCover: number;
  ec2Cover: number;
  baelDetails: string[];
  ec2Details: string[];
  comparison: string;
}