import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Flowchart() {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Logigramme de calcul</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="bg-blue-100 rounded-lg p-3 flex-1 text-center">
            Données d'entrée
            <div className="text-sm text-gray-600">
              Environnement, Classe d'exposition, Type de fissuration, Diamètre
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ArrowRight className="transform rotate-90" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-100 rounded-lg p-3 text-center">
            BAEL 99
            <div className="text-sm text-gray-600">
              Selon environnement et type de fissuration
            </div>
          </div>
          <div className="bg-green-100 rounded-lg p-3 text-center">
            Eurocode 2
            <div className="text-sm text-gray-600">
              max(cmin,b, cmin,dur) + Δcdev selon classe d'exposition
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ArrowRight className="transform rotate-90" />
        </div>
        <div className="bg-blue-100 rounded-lg p-3 text-center">
          Comparaison des résultats
          <div className="text-sm text-gray-600">
            Analyse de la norme la plus conservative
          </div>
        </div>
      </div>
    </div>
  );
}