// VistaTrade AI - Constants

export const EXCHANGES = [
  { id: 'binance', name: 'Binance', icon: '🟡' },
  { id: 'bybit', name: 'Bybit', icon: '🟠' },
  { id: 'okx', name: 'OKX', icon: '⚫' },
  { id: 'bitget', name: 'Bitget', icon: '🔵' },
  { id: 'kucoin', name: 'KuCoin', icon: '🟢' },
  { id: 'mercadobitcoin', name: 'Mercado Bitcoin', icon: '🟣' },
] as const;

export const SIGNAL_COLORS = {
  buy: '#00FF88',
  sell: '#FF3366',
  warning: '#FFB800',
  neutral: '#00C2FF',
} as const;

export const THEME_COLORS = {
  neonBlue: '#00C2FF',
  black: '#0A0A0A',
  titanium: '#1A1A1A',
  darkGray: '#2A2A2A',
  success: '#00FF88',
  danger: '#FF3366',
  warning: '#FFB800',
} as const;

export const TIMEFRAMES = [
  { value: '1m', label: '1 minuto' },
  { value: '5m', label: '5 minutos' },
  { value: '15m', label: '15 minutos' },
  { value: '1h', label: '1 hora' },
  { value: '4h', label: '4 horas' },
  { value: '1d', label: '1 dia' },
] as const;

export const TRADING_MODES = [
  { value: 'spot', label: 'Spot', description: 'Compra e venda direta' },
  { value: 'futures', label: 'Futuros', description: 'Contratos futuros' },
  { value: 'scalper', label: 'Scalper', description: 'Operações rápidas' },
] as const;
