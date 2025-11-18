import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL da imagem é obrigatória' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Você é um analista técnico especialista em trading. Analise o gráfico de criptomoedas/ações fornecido e retorne uma análise EXTREMAMENTE DETALHADA em JSON com:

1. trend: "bullish" | "bearish" | "sideways"
2. patterns: array de padrões identificados (ex: "doji", "hammer", "engulfing", "head and shoulders")
3. supportResistance: { support: [números], resistance: [números] }
4. indicators: análise de indicadores visíveis (RSI, MACD, médias móveis, volume, etc)
5. prediction: {
   direction: "high" | "low" | "indecisive",
   confidence: número 0-100,
   reasons: array de motivos detalhados,
   nextCandles: { candle1, candle2, candle3 } cada um "high" | "low" | "neutral"
}
6. confluenceScore: número 0-100 baseado em múltiplos fatores
7. analysis: texto detalhado explicando a análise completa
8. buyerSellerStrength: { buyers: 0-100, sellers: 0-100 }
9. riskLevel: "low" | "medium" | "high"
10. suggestedAction: "strong_buy" | "buy" | "hold" | "sell" | "strong_sell"

Seja EXTREMAMENTE preciso e profissional. Analise TODOS os detalhes visíveis no gráfico.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analise este gráfico de trading e forneça uma previsão detalhada da próxima vela e movimentos futuros.',
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high',
              },
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 2000,
    });

    const analysis = JSON.parse(response.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error('Erro na análise:', error);
    return NextResponse.json(
      { error: 'Erro ao analisar gráfico', details: error.message },
      { status: 500 }
    );
  }
}
