// VistaTrade AI - Types

export type Exchange = 'binance' | 'bybit' | 'okx' | 'bitget' | 'kucoin' | 'mercadobitcoin';

export type SignalType = 'buy' | 'sell' | 'neutral' | 'warning';

export type TradingMode = 'spot' | 'futures' | 'scalper';

export interface ConfluenceScore {
  score: number; // 0-100
  type: SignalType;
  confidence: number; // 0-100
  indicators: {
    rsi: number;
    macd: 'bullish' | 'bearish' | 'neutral';
    ema: 'bullish' | 'bearish' | 'neutral';
    bollinger: 'upper' | 'lower' | 'middle';
    stochastic: number;
    volume: 'high' | 'low' | 'normal';
  };
}

export interface CandlePrediction {
  direction: 'high' | 'low' | 'indecisive';
  confidence: number; // 0-100
  reasons: string[];
  nextCandles: {
    candle1: 'high' | 'low' | 'neutral';
    candle2: 'high' | 'low' | 'neutral';
    candle3: 'high' | 'low' | 'neutral';
  };
}

export interface ChartAnalysis {
  trend: 'bullish' | 'bearish' | 'sideways';
  patterns: string[];
  supportResistance: {
    support: number[];
    resistance: number[];
  };
  prediction: CandlePrediction;
  confluenceScore: number;
  analysis: string;
}

export interface Signal {
  id: string;
  asset: string;
  exchange: Exchange;
  type: SignalType;
  score: number;
  prediction: string;
  timestamp: Date;
  explanation: string;
}

export interface ExchangeConfig {
  name: string;
  apiKey?: string;
  apiSecret?: string;
  enabled: boolean;
}
