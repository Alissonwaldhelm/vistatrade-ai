'use client';

import { useState } from 'react';
import { Upload, Loader2, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AnalysisResult {
  trend: string;
  patterns: string[];
  prediction: {
    direction: string;
    confidence: number;
    reasons: string[];
    nextCandles: {
      candle1: string;
      candle2: string;
      candle3: string;
    };
  };
  confluenceScore: number;
  analysis: string;
  buyerSellerStrength?: {
    buyers: number;
    sellers: number;
  };
  riskLevel?: string;
  suggestedAction?: string;
}

export function AIVision() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeChart = async () => {
    if (!imageUrl) return;

    setAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.analysis);
      }
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getDirectionIcon = (direction: string) => {
    if (direction === 'high') return <TrendingUp className="w-5 h-5 text-[#00FF88]" />;
    if (direction === 'low') return <TrendingDown className="w-5 h-5 text-[#FF3366]" />;
    return <Activity className="w-5 h-5 text-[#FFB800]" />;
  };

  const getDirectionColor = (direction: string) => {
    if (direction === 'high') return 'text-[#00FF88]';
    if (direction === 'low') return 'text-[#FF3366]';
    return 'text-[#FFB800]';
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF] to-[#0080FF] flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Vision</h3>
              <p className="text-sm text-gray-400">Envie uma imagem do gráfico para análise</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-[#2A2A2A] rounded-xl p-8 text-center hover:border-[#00C2FF] transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="chart-upload"
            />
            <label htmlFor="chart-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                  <Upload className="w-8 h-8 text-[#00C2FF]" />
                </div>
                <div>
                  <p className="text-white font-medium">Clique para enviar</p>
                  <p className="text-sm text-gray-400">PNG, JPG até 10MB</p>
                </div>
              </div>
            </label>
          </div>

          {imageUrl && (
            <div className="space-y-4">
              <img
                src={imageUrl}
                alt="Gráfico"
                className="w-full rounded-lg border border-[#2A2A2A]"
              />
              <Button
                onClick={analyzeChart}
                disabled={analyzing}
                className="w-full bg-gradient-to-r from-[#00C2FF] to-[#0080FF] hover:opacity-90 text-white font-semibold"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  'Analisar Gráfico'
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Prediction Card */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#00C2FF] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Previsão da Próxima Vela</h3>
                <p className="text-sm text-gray-400">Baseado em análise técnica avançada</p>
              </div>
              {getDirectionIcon(result.prediction.direction)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-bold ${getDirectionColor(result.prediction.direction)}`}>
                      {result.prediction.direction === 'high' ? 'ALTA' : result.prediction.direction === 'low' ? 'BAIXA' : 'INDECISA'}
                    </span>
                    <span className="text-3xl font-bold text-[#00C2FF]">
                      {result.prediction.confidence}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00C2FF] to-[#00FF88] transition-all duration-500"
                      style={{ width: `${result.prediction.confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Next 3 Candles */}
              <div className="grid grid-cols-3 gap-3">
                {['candle1', 'candle2', 'candle3'].map((candle, idx) => {
                  const direction = result.prediction.nextCandles[candle as keyof typeof result.prediction.nextCandles];
                  return (
                    <div key={candle} className="bg-[#2A2A2A] rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Vela {idx + 1}</p>
                      <p className={`text-sm font-bold ${getDirectionColor(direction)}`}>
                        {direction === 'high' ? '↑ ALTA' : direction === 'low' ? '↓ BAIXA' : '→ NEUTRO'}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Reasons */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-300">Motivos:</p>
                {result.prediction.reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] mt-1.5" />
                    <p className="text-sm text-gray-300">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Confluence Score */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Score de Confluência</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Força do Sinal</span>
                  <span className="text-2xl font-bold text-[#00C2FF]">{result.confluenceScore}/100</span>
                </div>
                <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      result.confluenceScore >= 85
                        ? 'bg-gradient-to-r from-[#00FF88] to-[#00CC66]'
                        : result.confluenceScore >= 70
                        ? 'bg-gradient-to-r from-[#FFB800] to-[#FF8800]'
                        : 'bg-gradient-to-r from-[#FF3366] to-[#CC0044]'
                    }`}
                    style={{ width: `${result.confluenceScore}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Buyer/Seller Strength */}
          {result.buyerSellerStrength && (
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Força Compradores vs Vendedores</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Compradores</span>
                    <span className="text-sm font-bold text-[#00FF88]">{result.buyerSellerStrength.buyers}%</span>
                  </div>
                  <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00FF88]"
                      style={{ width: `${result.buyerSellerStrength.buyers}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Vendedores</span>
                    <span className="text-sm font-bold text-[#FF3366]">{result.buyerSellerStrength.sellers}%</span>
                  </div>
                  <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF3366]"
                      style={{ width: `${result.buyerSellerStrength.sellers}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Patterns & Analysis */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Análise Detalhada</h3>
            <div className="space-y-4">
              {result.patterns.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-300 mb-2">Padrões Identificados:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.patterns.map((pattern, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#2A2A2A] rounded-full text-xs text-[#00C2FF] border border-[#00C2FF]/30"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-2">Análise Completa:</p>
                <p className="text-sm text-gray-300 leading-relaxed">{result.analysis}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
