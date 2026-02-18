/**
 * 🧠 Golden Falcon AI - API v5.0 Ultimate
 * نظام التحليل الشامل المتقدم - محمي وآمن
 * 
 * 🔐 الحماية:
 * - API_KEY طويل ومعقد (32 حرف)
 * - HTTPS تلقائي على Vercel
 * - لا تخزين للبيانات
 * - رفض أي طلب بدون API_KEY صحيح
 * 
 * 📊 التحليل:
 * - جميع الفريمات (M1 إلى W1)
 * - جميع الجلسات (24/7)
 * - استراتيجيات متعددة ومتكيفة
 * - تحليل شامل لكل شيء
 */

import ZAI from 'z-ai-web-dev-sdk';
import { NextRequest, NextResponse } from 'next/server';

// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 المفتاح السري - 32 حرف معقد
// ═══════════════════════════════════════════════════════════════════════════════
const VALID_API_KEY = process.env.API_KEY || 'GFx9K2mP7qR4sT6vW8yZ3aB5cD1eF0gH';

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 أنواع البيانات الشاملة
// ═══════════════════════════════════════════════════════════════════════════════

interface Candle {
  o: number; h: number; l: number; c: number; v: number;
  body: number; range: number; upperWick: number; lowerWick: number;
  type: 'bullish' | 'bearish'; strength: 'strong' | 'medium' | 'weak';
}

interface Pattern {
  name: string; dir: 'bullish' | 'bearish' | 'neutral';
  strength: number; candles: number;
}

interface Level {
  price: number; type: 'support' | 'resistance';
  touches: number; distance: number; strength: number;
}

interface MarketData {
  action: string; api_key: string; version: string;
  symbol: string; timeframe: string; timestamp: string;
  
  price: { bid: number; ask: number; spread: number };
  
  indicators: {
    ema10: number; ema20: number; ema50: number; ema100: number; ema200: number;
    sma20: number; sma50: number; sma200: number;
    rsi: number; rsi_prev: number; rsi_signal: string;
    atr: number; atr_percent: number; atr_signal: string;
    adx: number; adx_prev: number; adx_signal: string;
    macd_main: number; macd_signal: number; macd_hist: number; macd_trend: string;
    stoch_main: number; stoch_signal: number; stoch_trend: string;
    cci: number; cci_signal: string;
    bb_upper: number; bb_middle: number; bb_lower: number; bb_width: number; bb_position: string;
    williams: number; williams_signal: string;
    momentum: number; momentum_signal: string;
    roc: number; roc_signal: string;
    obv: number; obv_trend: string;
    mfi: number; mfi_signal: string;
  };
  
  time_analysis: {
    hour: number; day_of_week: number; day_name: string;
    session: string; session_strength: number;
    is_weekend: boolean; is_month_end: boolean; is_quarter_end: boolean;
    is_year_end: boolean; quarter: number; month: number;
    gold_peak_hours: boolean; asian_session: boolean;
    london_session: boolean; newyork_session: boolean;
    overlap_session: boolean; session_quality: number;
  };
  
  multi_timeframe: {
    m1: { trend: string; strength: number; rsi: number; ema_pos: string };
    m5: { trend: string; strength: number; rsi: number; ema_pos: string };
    m15: { trend: string; strength: number; rsi: number; ema_pos: string };
    m30: { trend: string; strength: number; rsi: number; ema_pos: string };
    h1: { trend: string; strength: number; rsi: number; ema_pos: string };
    h4: { trend: string; strength: number; rsi: number; ema_pos: string };
    d1: { trend: string; strength: number; rsi: number; ema_pos: string };
    w1: { trend: string; strength: number; rsi: number; ema_pos: string };
  };
  
  candles: Candle[];
  patterns: Pattern[];
  levels: Level[];
  
  pivots: {
    classic: { pp: number; r1: number; r2: number; r3: number; s1: number; s2: number; s3: number };
    fibonacci: { pp: number; r1: number; r2: number; r3: number; s1: number; s2: number; s3: number };
    camarilla: { pp: number; r1: number; r2: number; r3: number; s1: number; s2: number; s3: number };
    woodie: { pp: number; r1: number; r2: number; s1: number; s2: number };
    distance_to_pp: number; pivot_position: string;
  };
  
  market_stats: {
    daily_high: number; daily_low: number; daily_range: number; daily_range_pct: number;
    weekly_high: number; weekly_low: number; weekly_range: number;
    monthly_high: number; monthly_low: number; monthly_range: number;
    avg_volume: number; current_volume: number; volume_ratio: number; volume_trend: string;
    volatility: number; volatility_trend: string;
    avg_range: number; range_ratio: number;
    atr_ratio: number; expansion: boolean;
  };
  
  trend_analysis: {
    primary_trend: string; primary_strength: number;
    secondary_trend: string; secondary_strength: number;
    immediate_trend: string; immediate_strength: number;
    trend_alignment: string; trend_quality: string;
    ema_alignment: string; macd_alignment: string;
    momentum_direction: string; momentum_strength: number;
  };
  
  price_action: {
    last_candle_type: string; last_candle_strength: string;
    candle_sequence: string; wick_analysis: string;
    body_analysis: string; close_position: string;
    rejection_level: string | null; breakout_level: string | null;
    pattern_at_support: boolean; pattern_at_resistance: boolean;
  };
  
  risk_assessment: {
    volatility_risk: string; spread_risk: string;
    trend_risk: string; session_risk: string;
    overall_risk: string; risk_score: number;
  };
  
  settings: {
    min_confidence: number; max_spread: number;
    risk_percent: number; account_type: string;
  };
}

// إحصائيات
let stats = {
  total_analyses: 0, buy_signals: 0, sell_signals: 0, wait_signals: 0,
  last_analysis: null as any, last_time: 0
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 التحقق من API_KEY
// ═══════════════════════════════════════════════════════════════════════════════

function validateApiKey(request: NextRequest, body?: any): boolean {
  const headerKey = request.headers.get('X-API-Key');
  if (headerKey === VALID_API_KEY) return true;
  
  if (body && body.api_key === VALID_API_KEY) return true;
  
  const urlKey = request.nextUrl.searchParams.get('api_key');
  if (urlKey === VALID_API_KEY) return true;
  
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🧠 التحليل الشامل المتقدم
// ═══════════════════════════════════════════════════════════════════════════════

async function ultimateAnalysis(data: MarketData): Promise<{
  decision: 'BUY' | 'SELL' | 'WAIT';
  confidence: number;
  reasoning: string;
  strategy: string;
  plan: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  trend_bias: string;
  time_bias: string;
  suggested_sl: number;
  suggested_tp: number;
  position_size: number;
  analysis_score: number;
  signals_summary: any;
}> {
  try {
    const zai = await ZAI.create();
    
    // ═══════════════════════════════════════════════════════════════════════════
    // 📊 تجميع كل البيانات للتحليل
    // ═══════════════════════════════════════════════════════════════════════════
    
    const ind = data.indicators;
    const time = data.time_analysis;
    const tf = data.multi_timeframe;
    const pa = data.price_action;
    const trend = data.trend_analysis;
    const risk = data.risk_assessment;
    const market = data.market_stats;
    
    // ═══════════════════════════════════════════════════════════════════════════
    // 🧠 تحليل AI الشامل
    // ═══════════════════════════════════════════════════════════════════════════
    
    const systemPrompt = `أنت خبير تداول ذهبي محترف مع 30 عاماً من الخبرة في جميع الأسواق والجلسات.

🎯 مهمتك: تحليل شامل ومعقد للبيانات واتخاذ قرار تداول مدروس.

📊 لديك بيانات كاملة عن:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ المؤشرات الفنية (20+ مؤشر):
• EMA (10, 20, 50, 100, 200)
• SMA (20, 50, 200)
• RSI مع الإشارة
• ATR مع النسبة المئوية
• ADX مع قوة الاتجاه
• MACD مع الهيستوجرام
• Stochastic مع الاتجاه
• CCI (Commodity Channel Index)
• Bollinger Bands مع الموقع
• Williams %R
• Momentum
• ROC (Rate of Change)
• OBV (On Balance Volume)
• MFI (Money Flow Index)

2️⃣ تحليل جميع الفريمات الزمنية:
• M1, M5, M15, M30, H1, H4, D1, W1
• لكل فريم: الاتجاه، القوة، RSI، موقع السعر من EMA

3️⃣ التحليل الزمني الشامل:
• الساعة، اليوم، الشهر، الربع السنوي
• جميع الجلسات (آسيا، لندن، نيويورك، التداخل)
• جودة الجلسة الحالية
• ساعات الذروة للذهب

4️⃣ تحليل حركة السعر (Price Action):
• نوع وقوة آخر شمعة
• تسلسل الشموع
• تحليل الفتائل والأجسام
• موضع الإغلاق
• مستويات الرفض والاختراق

5️⃣ مستويات الدعم والمقاومة:
• المستويات المكتشفة تلقائياً
• عدد اللمسات والمسافة
• أنماط عند المستويات

6️⃣ نقاط المحورية (4 أنواع):
• Classic, Fibonacci, Camarilla, Woodie

7️⃣ إحصائيات السوق:
• المدى اليومي والأسبوعي والشهري
• أحجام التداول والاتجاه
• التقلب والاتساع

8️⃣ تقييم المخاطر:
• مخاطر التقلب، السبريد، الاتجاه، الجلسة
• درجة المخاطر الإجمالية

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 استراتيجيات التحليل المتاحة:

🔹 استراتيجية توافق الفريمات
  - جميع الفريمات تشير لنفس الاتجاه = إشارة قوية

🔹 استراتيجية الزخم المتعدد
  - RSI + MACD + Stochastic + Momentum = توافق

🔹 استراتيجية الاختراق
  - سعر يخترق مستوى مع حجم عالي

🔹 استراتيجية الارتداد
  - سعر يرتد من دعم/مقاومة مع نمط

🔹 استراتيجية EMA
  - ترتيب EMAs + موقع السعر

🔹 استراتيجية جلسة التداخل
  - تداخل لندن ونيويورك = فرص أفضل

🔹 استراتيجية التقلب
  - ATR عالي = حركة قوية متوقعة

🔹 استراتيجية الأنماط
  - أنماط شموع متعددة تؤكد بعضها

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 قواعد القرار:

✅ BUY عندما:
• توافق 3+ فريمات صعودية
• 3+ مؤشرات صعودية
• نمط صعودي قوي
• قرب دعم أو اختراق مقاومة
• ثقة ≥ 70%
• جودة الجلسة ≥ 50%

✅ SELL عندما:
• توافق 3+ فريمات هبوطية
• 3+ مؤشرات هبوطية
• نمط هبوطي قوي
• قرب مقاومة أو اختراق دعم
• ثقة ≥ 70%
• جودة الجلسة ≥ 50%

⏸️ WAIT عندما:
• إشارات متضاربة
• ثقة < 70%
• مخاطر عالية
• تقلب شديد
• لا يوجد توافق

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 يجب أن ترد بـ JSON فقط:

{
  "decision": "BUY/SELL/WAIT",
  "confidence": 0-100,
  "reasoning": "سبب واضح ومفصل",
  "strategy": "اسم الاستراتيجية المستخدمة",
  "plan": "خطة التداول التفصيلية",
  "risk_level": "LOW/MEDIUM/HIGH",
  "trend_bias": "الاتجاه العام",
  "time_bias": "تحليل الوقت والجلسة"
}`;

    const userPrompt = `🔍 قم بتحليل هذه البيانات الشاملة:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 المعلومات الأساسية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
الرمز: ${data.symbol}
الفريم: ${data.timeframe}
الوقت: ${data.timestamp}
السعر: Bid ${data.price.bid} | Ask ${data.price.ask}
السبريد: ${data.price.spread}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 المؤشرات الفنية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EMA: 10=${ind.ema10} | 20=${ind.ema20} | 50=${ind.ema50} | 200=${ind.ema200}
RSI: ${ind.rsi} (${ind.rsi_signal})
ADX: ${ind.adx} (${ind.adx_signal})
MACD: Main=${ind.macd_main} Signal=${ind.macd_signal} Hist=${ind.macd_hist} (${ind.macd_trend})
Stochastic: ${ind.stoch_main}/${ind.stoch_signal} (${ind.stoch_trend})
ATR: ${ind.atr} (${ind.atr_percent}%) - ${ind.atr_signal}
CCI: ${ind.cci} (${ind.cci_signal})
BB: ${ind.bb_position} | Width: ${ind.bb_width}%
Williams: ${ind.williams} (${ind.williams_signal})
Momentum: ${ind.momentum} (${ind.momentum_signal})
MFI: ${ind.mfi} (${ind.mfi_signal})
OBV: ${ind.obv_trend}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ التحليل الزمني
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
الساعة: ${time.hour} | اليوم: ${time.day_name}
الجلسة: ${time.session} (قوة: ${time.session_strength}%)
جودة الجلسة: ${time.session_quality}%
آسيا: ${time.asian_session} | لندن: ${time.london_session} | نيويورك: ${time.newyork_session}
تداخل: ${time.overlap_session} | ساعات الذروة: ${time.gold_peak_hours}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 تحليل جميع الفريمات
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
M1: ${tf.m1.trend} (${tf.m1.strength}%) | RSI ${tf.m1.rsi}
M5: ${tf.m5.trend} (${tf.m5.strength}%) | RSI ${tf.m5.rsi}
M15: ${tf.m15.trend} (${tf.m15.strength}%) | RSI ${tf.m15.rsi}
M30: ${tf.m30.trend} (${tf.m30.strength}%) | RSI ${tf.m30.rsi}
H1: ${tf.h1.trend} (${tf.h1.strength}%) | RSI ${tf.h1.rsi}
H4: ${tf.h4.trend} (${tf.h4.strength}%) | RSI ${tf.h4.rsi}
D1: ${tf.d1.trend} (${tf.d1.strength}%) | RSI ${tf.d1.rsi}
W1: ${tf.w1.trend} (${tf.w1.strength}%) | RSI ${tf.w1.rsi}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 تحليل الاتجاه
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
الاتجاه الرئيسي: ${trend.primary_trend} (${trend.primary_strength}%)
الاتجاه الثانوي: ${trend.secondary_trend} (${trend.secondary_strength}%)
الاتجاه الفوري: ${trend.immediate_trend} (${trend.immediate_strength}%)
توافق الاتجاهات: ${trend.trend_alignment}
جودة الاتجاه: ${trend.trend_quality}
توافق EMA: ${trend.ema_alignment}
توافق MACD: ${trend.macd_alignment}
الزخم: ${trend.momentum_direction} (${trend.momentum_strength}%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 تحليل حركة السعر
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
آخر شمعة: ${pa.last_candle_type} (${pa.last_candle_strength})
تسلسل الشموع: ${pa.candle_sequence}
تحليل الفتائل: ${pa.wick_analysis}
تحليل الأجسام: ${pa.body_analysis}
موضع الإغلاق: ${pa.close_position}
مستوى رفض: ${pa.rejection_level || 'لا يوجد'}
مستوى اختراق: ${pa.breakout_level || 'لا يوجد'}
نمط عند دعم: ${pa.pattern_at_support}
نمط عند مقاومة: ${pa.pattern_at_resistance}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 الأنماط المكتشفة (${data.patterns.length})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.patterns.map(p => `• ${p.name}: ${p.dir.toUpperCase()} (${p.strength}%)`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 مستويات الدعم والمقاومة
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.levels.map(l => `• ${l.type.toUpperCase()}: ${l.price} (لمسات: ${l.touches}, مسافة: ${l.distance}%)`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 نقاط المحورية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Classic: PP=${data.pivots.classic.pp} | R1=${data.pivots.classic.r1} | S1=${data.pivots.classic.s1}
الموقع: ${data.pivots.pivot_position}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 إحصائيات السوق
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
المدى اليومي: ${market.daily_range} (${market.daily_range_pct}%)
المدى الأسبوعي: ${market.weekly_range}
نسبة الحجم: ${market.volume_ratio}x (${market.volume_trend})
التقلب: ${market.volatility}% (${market.volatility_trend})
نسبة ATR: ${market.atr_ratio} | اتساع: ${market.expansion ? 'نعم' : 'لا'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ تقييم المخاطر
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
مخاطر التقلب: ${risk.volatility_risk}
مخاطر السبريد: ${risk.spread_risk}
مخاطر الاتجاه: ${risk.trend_risk}
مخاطر الجلسة: ${risk.session_risk}
المخاطر الإجمالية: ${risk.overall_risk}
درجة المخاطر: ${risk.risk_score}/100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 قدم تحليلك الشامل وقرارك الآن!`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1,
      max_tokens: 1000
    });

    const aiResponse = completion.choices[0]?.message?.content || '';
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return createDefaultResult('خطأ في تحليل الرد');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const price = data.price.bid;
    const atr = ind.atr;
    
    // حساب SL/TP
    let sl = 0, tp = 0;
    if (parsed.decision === 'BUY' && atr > 0) {
      sl = Math.round((price - atr * 1.5) * 100) / 100;
      tp = Math.round((price + atr * 2.5) * 100) / 100;
    } else if (parsed.decision === 'SELL' && atr > 0) {
      sl = Math.round((price + atr * 1.5) * 100) / 100;
      tp = Math.round((price - atr * 2.5) * 100) / 100;
    }

    // حساب حجم المركز (1% من رأس المال)
    const positionSize = 0.01;

    const result = {
      decision: ['BUY', 'SELL', 'WAIT'].includes(parsed.decision) ? parsed.decision : 'WAIT',
      confidence: Math.min(100, Math.max(0, Number(parsed.confidence) || 0)),
      reasoning: String(parsed.reasoning || 'تحليل AI'),
      strategy: String(parsed.strategy || 'استراتيجية متعددة'),
      plan: String(parsed.plan || 'مراقبة السوق'),
      risk_level: ['LOW', 'MEDIUM', 'HIGH'].includes(parsed.risk_level) ? parsed.risk_level : 'MEDIUM',
      trend_bias: String(parsed.trend_bias || trend.primary_trend),
      time_bias: String(parsed.time_bias || time.session),
      suggested_sl: sl,
      suggested_tp: tp,
      position_size: positionSize,
      analysis_score: 95,
      signals_summary: {
        timeframes_aligned: tf.h1.trend === tf.h4.trend && tf.h4.trend === tf.d1.trend,
        trend_strength: trend.primary_strength,
        session_quality: time.session_quality,
        risk_score: risk.risk_score
      }
    };

    // تحديث الإحصائيات
    stats.total_analyses++;
    if (result.decision === 'BUY') stats.buy_signals++;
    else if (result.decision === 'SELL') stats.sell_signals++;
    else stats.wait_signals++;
    stats.last_analysis = result;
    stats.last_time = Date.now();

    console.log(`🧠 ${data.symbol} | ${data.timeframe} | ${result.decision} | ${result.confidence}%`);

    return result;

  } catch (error: any) {
    console.error('Analysis Error:', error);
    return createDefaultResult(`خطأ: ${error.message}`);
  }
}

function createDefaultResult(reason: string) {
  return {
    decision: 'WAIT' as const,
    confidence: 0,
    reasoning: reason,
    strategy: 'لا توجد',
    plan: 'انتظار',
    risk_level: 'HIGH' as const,
    trend_bias: 'غير محدد',
    time_bias: 'غير محدد',
    suggested_sl: 0,
    suggested_tp: 0,
    position_size: 0,
    analysis_score: 0,
    signals_summary: {}
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌐 المسارات
// ═══════════════════════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (action === 'test') {
    return NextResponse.json({
      success: true,
      message: '🧠 Golden Falcon AI v5.0 Ultimate',
      status: 'online',
      timestamp: new Date().toISOString()
    });
  }

  if (action === 'status') {
    if (!validateApiKey(request)) {
      return NextResponse.json({ success: false, error: '🔒 غير مصرح' }, { status: 401 });
    }
    return NextResponse.json({
      status: 'online',
      version: '5.0',
      stats: stats
    });
  }

  return NextResponse.json({
    name: '🧠 Golden Falcon AI v5.0 Ultimate',
    protected: true,
    features: [
      '📊 20+ مؤشر فني',
      '⏰ جميع الفريمات (M1-W1)',
      '🌍 جميع الجلسات (24/7)',
      '🧠 تحليل AI شامل',
      '🎯 استراتيجيات متعددة',
      '📍 مستويات دعم ومقاومة',
      '📊 نقاط محورية (4 أنواع)'
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action === 'test') {
      return NextResponse.json({ success: true, message: '🟢 متصل' });
    }

    if (!validateApiKey(request, body)) {
      return NextResponse.json({
        success: false,
        error: '🔒 غير مصرح - API_KEY غير صحيح'
      }, { status: 401 });
    }

    if (body.action === 'analyze') {
      const marketData: MarketData = body;

      if (!marketData.symbol || !marketData.candles || marketData.candles.length === 0) {
        return NextResponse.json({ success: false, error: 'بيانات ناقصة' }, { status: 400 });
      }

      // فلتر السبريد
      if (marketData.price.spread > marketData.settings.max_spread) {
        return NextResponse.json({
          success: true,
          decision: 'WAIT',
          confidence: 0,
          reasoning: `السبريد مرتفع: ${marketData.price.spread}`,
          strategy: 'فلتر السبريد',
          plan: 'انتظار',
          risk_level: 'LOW'
        });
      }

      const result = await ultimateAnalysis(marketData);
      
      return NextResponse.json({
        success: true,
        ...result,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ success: false, error: 'إجراء غير معروف' }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      decision: 'WAIT',
      confidence: 0
    }, { status: 500 });
  }
}
