# 🧠 Golden Falcon AI v5.0 Ultimate

نظام التداول الذكي للذهب - API محمي

## 🔐 المفتاح السري

```
API_KEY = GFx9K2mP7qR4sT6vW8yZ3aB5cD1eF0gH
```

## 📋 المميزات

- 📊 20+ مؤشر فني
- ⏰ جميع الفريمات (M1-W1)
- 🌍 جميع الجلسات (24/7)
- 🧠 تحليل AI شامل
- 🔒 محمي بـ API_KEY

## 🚀 الاستخدام

### اختبار الاتصال
```
GET /api/ai-trading?action=test
```

### التحليل
```
POST /api/ai-trading
Headers: X-API-Key: GFx9K2mP7qR4sT6vW8yZ3aB5cD1eF0gH
Body: {
  "action": "analyze",
  "api_key": "GFx9K2mP7qR4sT6vW8yZ3aB5cD1eF0gH",
  "symbol": "XAUUSD",
  ...
}
```

## ⚙️ Environment Variables

في Vercel، أضف:
- `API_KEY` = `GFx9K2mP7qR4sT6vW8yZ3aB5cD1eF0gH`
