'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface ConfluenceScoreProps {
  score: number;
  type: 'buy' | 'sell' | 'neutral' | 'warning';
  confidence: number;
}

export function ConfluenceScore({ score, type, confidence }: ConfluenceScoreProps) {
  const getColor = () => {
    if (type === 'buy') return '#00FF88';
    if (type === 'sell') return '#FF3366';
    if (type === 'warning') return '#FFB800';
    return '#00C2FF';
  };

  const getIcon = () => {
    if (type === 'buy') return <TrendingUp className="w-8 h-8" />;
    if (type === 'sell') return <TrendingDown className="w-8 h-8" />;
    return <Activity className="w-8 h-8" />;
  };

  const getLabel = () => {
    if (type === 'buy') return 'COMPRA';
    if (type === 'sell') return 'VENDA';
    if (type === 'warning') return 'ATENÇÃO';
    return 'NEUTRO';
  };

  return (
    <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 p-8" style={{ borderColor: getColor() }}>
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${getColor()}20`, color: getColor() }}
          >
            {getIcon()}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">Score de Confluência</p>
          <div className="text-7xl font-bold mb-2" style={{ color: getColor() }}>
            {score}
          </div>
          <p className="text-2xl font-bold" style={{ color: getColor() }}>
            {getLabel()}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Confiança</span>
            <span className="text-lg font-bold text-white">{confidence}%</span>
          </div>
          <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${confidence}%`,
                background: `linear-gradient(to right, ${getColor()}, ${getColor()}CC)`,
              }}
            />
          </div>
        </div>

        {score >= 85 && (
          <div className="bg-[#2A2A2A] rounded-lg p-4">
            <p className="text-sm font-semibold" style={{ color: getColor() }}>
              ✓ Sinal de alta qualidade detectado
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Múltiplos indicadores confirmam esta operação
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
