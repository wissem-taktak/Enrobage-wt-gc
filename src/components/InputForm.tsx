import React from 'react';
import { FormInputs } from '../types';
import { ArrowDown } from 'lucide-react';

interface InputFormProps {
  inputs: FormInputs;
  onChange: (key: keyof FormInputs, value: string | number | boolean) => void;
  onCalculate: () => void;
}

export default function InputForm({ inputs, onChange, onCalculate }: InputFormProps) {
  return (
    <div className="space-y-8">
      {/* Données communes */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Données communes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diamètre des armatures (mm)
            </label>
            <input
              type="number"
              value={inputs.barDiameter}
              onChange={(e) => onChange('barDiameter', Number(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="6"
              max="40"
            />
          </div>
        </div>
      </div>

      {/* BAEL 99 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          Paramètres BAEL 99
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Environnement
            </label>
            <select
              value={inputs.environment}
              onChange={(e) => onChange('environment', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="maritime">Maritime ou très agressif</option>
              <option value="aggressive">Agressif ou exposé aux intempéries</option>
              <option value="protected">Local couvert et clos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de fissuration
            </label>
            <select
              value={inputs.crackType}
              onChange={(e) => onChange('crackType', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="nonPrejudicial">Peu préjudiciable</option>
              <option value="prejudicial">Préjudiciable</option>
              <option value="veryPrejudicial">Très préjudiciable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Eurocode 2 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          Paramètres Eurocode 2
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Classe d'exposition
            </label>
            <select
              value={inputs.exposureClass}
              onChange={(e) => onChange('exposureClass', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="X0">X0 - Aucun risque</option>
              <option value="XC1">XC1 - Sec ou humide en permanence</option>
              <option value="XC2">XC2 - Humide, rarement sec</option>
              <option value="XC3">XC3 - Humidité modérée</option>
              <option value="XC4">XC4 - Alternance humide/sec</option>
              <option value="XD1">XD1 - Humidité modérée + chlorures</option>
              <option value="XD2">XD2 - Humide + chlorures</option>
              <option value="XD3">XD3 - Alternance humide/sec + chlorures</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Classe de béton
            </label>
            <select
              value={inputs.concreteClass}
              onChange={(e) => onChange('concreteClass', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="C25/30">C25/30</option>
              <option value="C30/37">C30/37</option>
              <option value="C35/45">C35/45</option>
              <option value="C40/50">C40/50</option>
              <option value="C45/55">C45/55</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de ciment
            </label>
            <select
              value={inputs.cementType}
              onChange={(e) => onChange('cementType', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="CEM-I">CEM I</option>
              <option value="CEM-II/A">CEM II/A</option>
              <option value="CEM-II/B">CEM II/B</option>
              <option value="CEM-III/A">CEM III/A</option>
              <option value="CEM-III/B">CEM III/B</option>
              <option value="CEM-IV/A">CEM IV/A</option>
              <option value="CEM-IV/B">CEM IV/B</option>
              <option value="CEM-V/A">CEM V/A</option>
              <option value="CEM-V/B">CEM V/B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée d'utilisation de projet
            </label>
            <select
              value={inputs.designWorkingLife}
              onChange={(e) => onChange('designWorkingLife', Number(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="50">50 ans</option>
              <option value="100">100 ans</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inputs.compactCover}
                onChange={(e) => onChange('compactCover', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Enrobage compact
              </span>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={onCalculate}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Calculer l'enrobage
      </button>
    </div>
  );
}