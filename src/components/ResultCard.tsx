import React from 'react';
import { BookOpen, Info } from 'lucide-react';

interface ResultCardProps {
  title: string;
  cover: number;
  details: string[];
  variant: 'bael' | 'ec2';
}

export default function ResultCard({ title, cover, details, variant }: ResultCardProps) {
  const getBgColor = () => {
    return variant === 'bael' ? 'bg-green-50' : 'bg-blue-50';
  };

  const getTextColor = () => {
    return variant === 'bael' ? 'text-green-600' : 'text-blue-600';
  };

  return (
    <div className={`${getBgColor()} rounded-lg shadow-lg p-6`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <div className={`w-3 h-3 ${variant === 'bael' ? 'bg-green-500' : 'bg-blue-500'} rounded-full mr-2`}></div>
        <BookOpen className="mr-2" />
        {title}
      </h2>
      <div className="mb-4">
        <div className={`text-3xl font-bold ${getTextColor()}`}>
          {cover} mm
        </div>
        <div className="text-sm text-gray-600">Enrobage requis</div>
      </div>
      <div className="space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="text-sm text-gray-600 flex items-start">
            <Info className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
            {detail}
          </div>
        ))}
      </div>
    </div>
  );
}