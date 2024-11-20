import React, { useState } from 'react';
import { Bot, Languages } from 'lucide-react';
import { supportedLanguages } from '../lib/supportedLanguages';

export default function WebDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0]);

  const firstMessages: { [key: string]: string } = {
    'en-US': 'Hey! Welcome to our store, how can I help you today?',
    'en': 'Hey! Welcome to our store, how can I help you today?',
    'fr': 'Hey! Bienvenue dans notre magasin, comment puis-je vous aider aujourd\'hui?',
    'de': 'Hey! Willkommen in unserem Laden, wie kann ich Ihnen heute helfen?',
    'de-CH': 'Hey! Grüezi! Willkomme i üsem Lade, wie cha ich Ihne hüt hälfe?',
    'de-AT': 'Hey! Willkommen in unserem Laden, wie kann ich Ihnen heute helfen?',
    'hi': 'अरे! हमारे स्टोर में आपका स्वागत है, मैं आपकी कैसे मदद कर सकता हूँ?',
    'ar': 'مرحبًا! مرحبًا بكم في متجرنا، كيف يمكنني مساعدتك اليوم؟',
    'cs': 'Ahoj! Vítejte v našem obchodě, jak vám mohu dnes pomoci?',
    'es': '¡Hey! Bienvenido a nuestra tienda, ¿cómo puedo ayudarte hoy?',
    'it': 'Ehi! Benvenuto nel nostro negozio, come posso aiutarti oggi?',
    'zh': '嘿！欢迎光临我们的商店，我今天能为您做些什么？',
    'ko': '안녕하세요! 우리 가게에 오신 것을 환영합니다, 오늘 무엇을 도와드릴까요?',
    'nl': 'Hey! Welkom in onze winkel, hoe kan ik je vandaag helpen?',
    'tr': 'Hey! Mağazamıza hoş geldiniz, size bugün nasıl yardımcı olabilirim?',
    'sv': 'Hej! Välkommen till vår butik, hur kan jag hjälpa dig idag?',
    'id': 'Hey! Selamat datang di toko kami, bagaimana saya bisa membantu Anda hari ini?',
    'fil': 'Hey! Maligayang pagdating sa aming tindahan, paano kita matutulungan ngayon?',
    'ja': 'こんにちは！私たちの店へようこそ、今日はどのようにお手伝いできますか？',
    'uk': 'Привіт! Ласкаво просимо до нашого магазину, як я можу вам допомогти сьогодні?',
    'el': 'Γεια! Καλώς ήρθατε στο κατάστημά μας, πώς μπορώ να σας βοηθήσω σήμερα;',
    'sk': 'Ahoj! Vitajte v našom obchode, ako vám dnes môžem pomôcť?',
    'fi': 'Hei! Tervetuloa kauppaamme, miten voin auttaa sinua tänään?',
    'ro': 'Hei! Bine ați venit în magazinul nostru, cum vă pot ajuta astăzi?',
    'da': 'Hej! Velkommen til vores butik, hvordan kan jeg hjælpe dig i dag?',
    'bg': 'Здравейте! Добре дошли в нашия магазин, как мога да ви помогна днес?',
    'ms': 'Hey! Selamat datang ke kedai kami, bagaimana saya boleh membantu anda hari ini?',
    'hr': 'Hej! Dobrodošli u našu trgovinu, kako vam mogu pomoći danas?',
    'ta': 'ஹே! எங்கள் கடைக்கு வரவேற்கிறோம், இன்று நான் உங்களை எப்படி உதவ முடியும்?',
    'pt': 'Ei! Bem-vindo à nossa loja, como posso ajudá-lo hoje?',
    'pl': 'Hej! Witamy w naszym sklepie, jak mogę Ci dziś pomóc?',
  };

  const firstMessagesAfter: { [key: string]: string } = {
    'en-US': "Hey! Welcome to our store, we're running a site-wide 10% off deal today! How can I help you?",
    'en': "Hey! Welcome to our store, we're running a site-wide 10% off deal today! How can I help you?",
    'fr': "Hey! Bienvenue dans notre magasin, nous avons une offre de 10% de réduction sur tout le site aujourd'hui! Comment puis-je vous aider?",
    'de': "Hey! Willkommen in unserem Laden, wir haben heute einen 10% Rabatt auf alles! Wie kann ich Ihnen helfen?",
    'de-CH': "Hey! Grüezi! Willkomme i üsem Lade, mir händ hüt 10% Rabatt uf alles! Wie cha ich Ihne hüt hälfe?",
    'de-AT': "Hey! Willkommen in unserem Laden, wir haben heute einen 10% Rabatt auf alles! Wie kann ich Ihnen helfen?",
    'hi': "अरे! हमारे स्टोर में आपका स्वागत है, आज हम पूरे स्टोर पर 10% की छूट दे रहे हैं! मैं आपकी कैसे मदद कर सकता हूँ?",
    'ar': "مرحبًا! مرحبًا بكم في متجرنا، نحن نقدم خصم 10% على جميع المنتجات اليوم! كيف يمكنني مساعدتك؟",
    'cs': "Ahoj! Vítejte v našem obchodě, dnes máme 10% slevu na vše! Jak vám mohu pomoci?",
    'es': "¡Hey! Bienvenido a nuestra tienda, ¡hoy tenemos un 10% de descuento en todo el sitio! ¿Cómo puedo ayudarte?",
    'it': "Ehi! Benvenuto nel nostro negozio, oggi abbiamo uno sconto del 10% su tutto il sito! Come posso aiutarti?",
    'zh': "嘿！欢迎光临我们的商店，今天我们全场打九折！我能为您做些什么？",
    'ko': "안녕하세요! 우리 가게에 오신 것을 환영합니다, 오늘 전 품목 10% 할인 중입니다! 무엇을 도와드릴까요?",
    'nl': "Hey! Welkom in onze winkel, we hebben vandaag 10% korting op alles! Hoe kan ik je helpen?",
    'tr': "Hey! Mağazamıza hoş geldiniz, bugün tüm ürünlerde %10 indirim var! Size nasıl yardımcı olabilirim?",
    'sv': "Hej! Välkommen till vår butik, vi har 10% rabatt på allt idag! Hur kan jag hjälpa dig?",
    'id': "Hey! Selamat datang di toko kami, kami sedang mengadakan diskon 10% untuk semua produk hari ini! Bagaimana saya bisa membantu Anda?",
    'fil': "Hey! Maligayang pagdating sa aming tindahan, may 10% off kami sa lahat ng produkto ngayon! Paano kita matutulungan?",
    'ja': "こんにちは！私たちの店へようこそ、今日は全品10%オフです！どのようにお手伝いできますか？",
    'uk': "Привіт! Ласкаво просимо до нашого магазину, сьогодні у нас знижка 10% на все! Як я можу вам допомогти?",
    'el': "Γεια! Καλώς ήρθατε στο κατάστημά μας, έχουμε 10% έκπτωση σε όλα σήμερα! Πώς μπορώ να σας βοηθήσω;",
    'sk': "Ahoj! Vitajte v našom obchode, dnes máme 10% zľavu na všetko! Ako vám môžem pomôcť?",
    'fi': "Hei! Tervetuloa kauppaamme, meillä on tänään 10% alennus kaikista tuotteista! Miten voin auttaa sinua?",
    'ro': "Hei! Bine ați venit în magazinul nostru, astăzi avem o reducere de 10% la toate produsele! Cum vă pot ajuta?",
    'da': "Hej! Velkommen til vores butik, vi har 10% rabat på alt i dag! Hvordan kan jeg hjælpe dig?",
    'bg': "Здравейте! Добре дошли в нашия магазин, днес имаме 10% отстъпка на всичко! Как мога да ви помогна?",
    'ms': "Hey! Selamat datang ke kedai kami, kami sedang mengadakan diskaun 10% untuk semua produk hari ini! Bagaimana saya boleh membantu anda?",
    'hr': "Hej! Dobrodošli u našu trgovinu, danas imamo 10% popusta na sve! Kako vam mogu pomoći?",
    'ta': "ஹே! எங்கள் கடைக்கு வரவேற்கிறோம், இன்று எங்கள் அனைத்து பொருட்களுக்கும் 10% தள்ளுபடி உள்ளது! இன்று நான் உங்களை எப்படி உதவ முடியும்?",
    'pt': "Ei! Bem-vindo à nossa loja, hoje temos 10% de desconto em todo o site! Como posso ajudá-lo?",
    'pl': "Hej! Witamy w naszym sklepie, dziś mamy 10% zniżki na wszystko! Jak mogę Ci pomóc?",
  };

  return (
    <div className="rounded-xl bg-gray-900/95 p-5 shadow-2xl backdrop-blur-sm border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <span className="text-white font-semibold text-lg">Sales Agent</span>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800/50 rounded-full">
          <Languages className="h-3.5 w-3.5 text-primary/70" />
          <span className="text-sm text-gray-300">Managing in English</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800/70 rounded-xl p-4 border border-gray-700/50">
          <div className="text-sm font-medium text-gray-400 mb-2">Command</div>
          <div className="text-white text-lg font-medium">
            Update the sales agent so that it knows about the 10% off site-wide deal
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-2">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang)}
              className={`w-8 h-6 flex items-center justify-center rounded-md transition-all duration-200 ${
                selectedLanguage.code === lang.code 
                  ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/20' 
                  : 'border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
              }`}
              title={lang.native_name}
            >
              <lang.icon className="w-5 h-5 object-contain" />
            </button>
          ))}
        </div>

        <div className="bg-gray-800/30 rounded-xl p-2 border border-gray-800">
          <div className="text-sm font-medium text-gray-400 mb-2">Response</div>
          <div className="text-emerald-400 font-medium mb-2">
            ✨ All agents' prompt updated to include site-wide deal
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-800">
              <div className="text-gray-500 mb-1.5">Previous First Message:</div>
              <div className="text-gray-300">"{firstMessages[selectedLanguage.locale]}"</div>
            </div>
            <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-800">
              <div className="text-gray-500 mb-1.5">Updated First Message:</div>
              <div className="text-primary-400">"{firstMessagesAfter[selectedLanguage.locale]}"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}