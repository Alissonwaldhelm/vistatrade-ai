'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIVision } from '@/components/custom/ai-vision';
import { ConfluenceScore } from '@/components/custom/confluence-score';
import {
  Eye,
  TrendingUp,
  Activity,
  Zap,
  BarChart3,
  Settings,
  Bell,
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF] to-[#0080FF] flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">VistaTrade AI</h1>
                <p className="text-xs text-[#00C2FF]">Enxerga o mercado antes que ele aconteça</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#1A1A1A] border border-[#2A2A2A] p-1">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00C2FF] data-[state=active]:to-[#0080FF] data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="ai-vision"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00C2FF] data-[state=active]:to-[#0080FF] data-[state=active]:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              AI Vision
            </TabsTrigger>
            <TabsTrigger
              value="signals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00C2FF] data-[state=active]:to-[#0080FF] data-[state=active]:text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Sinais ao Vivo
            </TabsTrigger>
            <TabsTrigger
              value="robot"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00C2FF] data-[state=active]:to-[#0080FF] data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Robô Automático
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Confluence Score */}
              <div className="lg:col-span-1">
                <ConfluenceScore score={87} type="buy" confidence={92} />
              </div>

              {/* Market Overview */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Tendência Atual</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-[#00FF88]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-3xl font-bold text-[#00FF88]">BULLISH</p>
                      <p className="text-sm text-gray-400">Tendência de alta confirmada</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Próximas 3 Velas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Vela 1', direction: 'ALTA', color: '#00FF88' },
                      { label: 'Vela 2', direction: 'ALTA', color: '#00FF88' },
                      { label: 'Vela 3', direction: 'NEUTRO', color: '#FFB800' },
                    ].map((candle, idx) => (
                      <div key={idx} className="bg-[#2A2A2A] rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-400 mb-2">{candle.label}</p>
                        <p className="text-lg font-bold" style={{ color: candle.color }}>
                          {candle.direction}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Latest Signals */}
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Últimos Sinais</h3>
              <div className="space-y-3">
                {[
                  {
                    asset: 'BTC/USDT',
                    exchange: 'Binance',
                    type: 'buy',
                    score: 92,
                    time: '2 min atrás',
                  },
                  {
                    asset: 'ETH/USDT',
                    exchange: 'Bybit',
                    type: 'buy',
                    score: 88,
                    time: '5 min atrás',
                  },
                  {
                    asset: 'SOL/USDT',
                    exchange: 'OKX',
                    type: 'sell',
                    score: 85,
                    time: '8 min atrás',
                  },
                ].map((signal, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg hover:bg-[#333333] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          signal.type === 'buy' ? 'bg-[#00FF88]' : 'bg-[#FF3366]'
                        }`}
                      />
                      <div>
                        <p className="text-white font-semibold">{signal.asset}</p>
                        <p className="text-xs text-gray-400">{signal.exchange}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#00C2FF] font-bold">{signal.score}</p>
                      <p className="text-xs text-gray-400">{signal.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Buyer vs Seller Strength */}
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Força Compradores vs Vendedores
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Compradores</span>
                    <span className="text-lg font-bold text-[#00FF88]">68%</span>
                  </div>
                  <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00FF88] w-[68%] transition-all duration-500" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Vendedores</span>
                    <span className="text-lg font-bold text-[#FF3366]">32%</span>
                  </div>
                  <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF3366] w-[32%] transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* AI Vision Tab */}
          <TabsContent value="ai-vision">
            <AIVision />
          </TabsContent>

          {/* Signals Tab */}
          <TabsContent value="signals">
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Sinais ao Vivo</h3>
              <p className="text-gray-400">
                Integração com exchanges em desenvolvimento. Em breve você verá sinais em tempo real
                de todas as exchanges conectadas.
              </p>
            </Card>
          </TabsContent>

          {/* Robot Tab */}
          <TabsContent value="robot">
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Robô Automático</h3>
              <p className="text-gray-400">
                Sistema de trading automático em desenvolvimento. Em breve você poderá configurar
                estratégias e deixar o robô operar por você.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
