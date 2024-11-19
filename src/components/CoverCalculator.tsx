import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import InputForm from './InputForm';
import ResultCard from './ResultCard';
import Flowchart from './Flowchart';
import { calculateBaelCover, calculateEc2Cover } from '../utils/calculations';
import type { FormInputs, CalculationResult } from '../types';

export default function CoverCalculator() {
  const [inputs, setInputs] = useState<FormInputs>({
    environment: 'normal',
    crackType: 'nonPrejudicial',
    concreteClass: 'C25/30',
    barDiameter: 12,
    exposureClass: 'XC1',
    designWorkingLife: 50,
    compactCover: false,
    cementType: 'CEM-I'
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleInputChange = (key: keyof FormInputs, value: string | number | boolean) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const calculateCover = () => {
    const baelResult = calculateBaelCover(
      inputs.environment,
      inputs.crackType,
      inputs.barDiameter
    );

    const ec2Result = calculateEc2Cover(
      inputs.exposureClass,
      inputs.barDiameter,
      inputs.concreteClass,
      inputs.designWorkingLife,
      inputs.compactCover,
      inputs.cementType
    );

    const comparison = baelResult.cover > ec2Result.cover
      ? `L'enrobage BAEL (${baelResult.cover}mm) est plus conservateur que l'EC2 (${ec2Result.cover}mm)`
      : baelResult.cover < ec2Result.cover
      ? `L'enrobage EC2 (${ec2Result.cover}mm) est plus conservateur que le BAEL (${baelResult.cover}mm)`
      : 'Les deux normes donnent le même enrobage';

    setResult({
      baelCover: baelResult.cover,
      ec2Cover: ec2Result.cover,
      baelDetails: baelResult.details,
      ec2Details: ec2Result.details,
      comparison
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              <Calculator className="inline-block mr-2 mb-1" />
              Calculateur d'enrobage des armatures
            </h1>
            <p className="text-gray-600">
              Comparaison BAEL 99 vs Eurocode 2
            </p>
          </div>

          <InputForm
            inputs={inputs}
            onChange={handleInputChange}
            onCalculate={calculateCover}
          />

          {result && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <ResultCard
                  title="BAEL 99"
                  cover={result.baelCover}
                  details={result.baelDetails}
                  variant="bael"
                />
                <ResultCard
                  title="Eurocode 2"
                  cover={result.ec2Cover}
                  details={result.ec2Details}
                  variant="ec2"
                />
              </div>
              <div className="bg-white rounded-lg p-4 text-gray-800 text-center font-medium shadow-lg">
                {result.comparison}
              </div>
            </div>
          )}

          <Flowchart />
        </div>
      </div>
    </div>
  );
}