import React, { useState } from 'react';
import { Bot, Languages } from 'lucide-react';
import { supportedLanguages } from '../lib/supportedLanguages';
import { Button } from "@/components/ui/button";
import { Plus, Settings2 } from "lucide-react";

export default function WebDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0]);
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');

  const softwareFirstMessage: { [key: string]: string } = {
    'en-US': "Hello! I'm your virtual sales agent for our software solutions. How can I assist you in finding the right tools for your needs today?",
    'en': "Hello! I'm your virtual sales agent for our software solutions. How can I assist you in finding the right tools for your needs today?",
    'fr': "Bonjour ! Je suis votre agent commercial virtuel pour nos solutions logicielles. Comment puis-je vous aider à trouver les bons outils pour vos besoins aujourd'hui ?",
    'de': "Hallo! Ich bin Ihr virtueller Vertriebsagent für unsere Softwarelösungen. Wie kann ich Ihnen heute helfen, die richtigen Werkzeuge für Ihre Bedürfnisse zu finden?",
    'de-CH': "Grüezi! Ich bin Ihr virtueller Vertriebsagent für unsere Softwarelösungen. Wie kann ich Ihnen heute helfen, die richtigen Werkzeuge für Ihre Bedürfnisse zu finden?",
    'de-AT': "Hallo! Ich bin Ihr virtueller Vertriebsagent für unsere Softwarelösungen. Wie kann ich Ihnen heute helfen, die richtigen Werkzeuge für Ihre Bedürfnisse zu finden?",
    'hi': "नमस्ते! मैं आपके लिए हमारे सॉफ़्टवेयर समाधानों का वर्चुअल बिक्री एजेंट हूँ। आज आपकी आवश्यकताओं के लिए सही उपकरण खोजने में मैं आपकी कैसे मदद कर सकता हूँ?",
    'ar': "مرحبًا! أنا وكيل المبيعات الافتراضي لحلول البرمجيات لدينا. كيف يمكنني مساعدتك في العثور على الأدوات المناسبة لاحتياجاتك اليوم؟",
    'cs': "Ahoj! Jsem váš virtuální prodejní agent pro naše softwarová řešení. Jak vám mohu pomoci najít správné nástroje pro vaše potřeby dnes?",
    'es': "¡Hola! Soy tu agente de ventas virtual para nuestras soluciones de software. ¿Cómo puedo ayudarte a encontrar las herramientas adecuadas para tus necesidades hoy?",
    'it': "Ciao! Sono il tuo agente di vendita virtuale per le nostre soluzioni software. Come posso aiutarti a trovare gli strumenti giusti per le tue esigenze oggi?",
    'zh': "你好！我是您虚拟的软件解决方案销售代理。今天我能如何帮助您找到合适的工具？",
    'ko': "안녕하세요! 저는 귀하의 소프트웨어 솔루션을 위한 가상 영업 대리인입니다. 오늘 귀하의 필요에 맞는 적절한 도구를 찾는 데 어떻게 도와드릴까요?",
    'nl': "Hallo! Ik ben uw virtuele verkoopagent voor onze softwareoplossingen. Hoe kan ik u vandaag helpen de juiste tools voor uw behoeften te vinden?",
    'tr': "Merhaba! Yazılım çözümlerimiz için sanal satış temsilcinizim. Bugün ihtiyaçlarınız için doğru araçları bulmanıza nasıl yardımcı olabilirim?",
    'sv': "Hej! Jag är din virtuella försäljningsagent för våra mjukvarulösningar. Hur kan jag hjälpa dig att hitta rätt verktyg för dina behov idag?",
    'id': "Halo! Saya adalah agen penjualan virtual Anda untuk solusi perangkat lunak kami. Bagaimana saya dapat membantu Anda menemukan alat yang tepat untuk kebutuhan Anda hari ini?",
    'fil': "Kumusta! Ako ang iyong virtual na sales agent para sa aming mga solusyon sa software. Paano kita matutulungan sa paghahanap ng tamang mga tool para sa iyong mga pangangailangan ngayon?",
    'ja': "こんにちは！私はあなたのためのソフトウェアソリューションの仮想営業エージェントです。今日はどのようにしてあなたのニーズに合ったツールを見つけるお手伝いができますか？",
    'uk': "Привіт! Я ваш віртуальний агент з продажу наших програмних рішень. Як я можу допомогти вам знайти потрібні інструменти для ваших потреб сьогодні?",
    'el': "Γεια σας! Είμαι ο εικονικός σας πωλητής για τις λύσεις λογισμικού μας. Πώς μπορώ να σας βοηθήσω να βρείτε τα κατάλληλα εργαλεία για τις ανάγκες σας σήμερα;",
    'sk': "Ahoj! Som váš virtuálny obchodný agent pre naše softvérové riešenia. Ako vám môžem pomôcť nájsť správne nástroje pre vaše potreby dnes?",
    'fi': "Hei! Olen virtuaalinen myyntiedustajasi ohjelmistoratkaisuillemme. Kuinka voin auttaa sinua löytämään oikeat työkalut tarpeisiisi tänään?",
    'ro': "Bună! Sunt agentul tău virtual de vânzări pentru soluțiile noastre software. Cum te pot ajuta să găsești instrumentele potrivite pentru nevoile tale astăzi?",
    'da': "Hej! Jeg er din virtuelle salgsagent for vores softwareløsninger. Hvordan kan jeg hjælpe dig med at finde de rigtige værktøjer til dine behov i dag?",
    'bg': "Здравейте! Аз съм вашият виртуален търговски агент за нашите софтуерни решения. Как мога да ви помогна да намерите правилните инструменти за вашите нужди днес?",
    'ms': "Hai! Saya adalah ejen jualan maya anda untuk penyelesaian perisian kami. Bagaimana saya boleh membantu anda mencari alat yang sesuai untuk keperluan anda hari ini?",
    'hr': "Bok! Ja sam vaš virtualni prodajni agent za naša softverska rješenja. Kako vam mogu pomoći pronaći prave alate za vaše potrebe danas?",
    'ta': "வணக்கம்! நாங்கள் வழங்கும் மென்பொருள் தீர்வுகளுக்கான உங்கள் மெய்நிகர் விற்பனை முகவர் நான். இன்று உங்கள் தேவைகளுக்கேற்ப சரியான கருவிகளை கண்டுபிடிக்க நான் எப்படி உதவ முடியும்?",
    'pt': "Olá! Sou o seu agente de vendas virtual para as nossas soluções de software. Como posso ajudá-lo a encontrar as ferramentas certas para as suas necessidades hoje?",
    'pl': "Cześć! Jestem twoim wirtualnym agentem sprzedaży dla naszych rozwiązań programowych. Jak mogę pomóc ci znaleźć odpowiednie narzędzia dla twoich potrzeb dzisiaj?",
  };

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
    'ta': "ஹே! எங்கள் கடைக்கு வரவேற்கிறோம், இன்று எங்கள் அனைத்து ொருட்களுக்கும் 10% தள்ளுபடி உள்ளது! இன்று நான் உங்களை எப்படி உதவ முடியும்?",
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
          <span className="text-white font-semibold text-lg">Sales Agent Demo</span>
        </div>
      </div>

      <div className="flex space-x-3 mb-4">
        <Button
          onClick={() => setActiveTab('create')}
          variant={activeTab === 'create' ? 'default' : 'secondary'}
          size="lg"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Agent
        </Button>
        <Button
          onClick={() => setActiveTab('manage')}
          variant={activeTab === 'manage' ? 'default' : 'secondary'}
          size="lg"
          className="gap-2"
        >
          <Settings2 className="h-4 w-4" />
          Manage Agent
        </Button>
      </div>

      <div className="space-y-2">
        {activeTab === 'create' ? (
          <>
            <div className="bg-gray-800/70 rounded-xl p-4 border border-gray-700/50">
              <div className="text-sm font-medium text-gray-400 mb-2">Command</div>
              <div className="text-white text-lg font-medium">
                Create a sales agent for our software
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-2 border border-gray-800">
              <div className="text-sm font-medium text-gray-400 mb-2">Response</div>
              <div className="text-emerald-400 font-medium mb-2">
                ✨ Sales agent created with specialized software sales knowledge
              </div>
              
              <div className="flex flex-wrap gap-2.5 mt-4 mb-2">
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

              <div className="space-y-2 text-sm text-gray-400">
                <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-800">
                  <div className="text-gray-500 mb-1.5">First Message:</div>
                  <div className="text-gray-300">"{softwareFirstMessage[selectedLanguage.locale]}"</div>
                </div>
                <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-800">
                  <div className="text-gray-500 mb-1.5">System Prompt:</div>
                  <div className="text-gray-400 italic">[Long specialized prompt for software sales...]</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-800/70 rounded-xl p-4 border border-gray-700/50">
              <div className="text-sm font-medium text-gray-400 mb-2">Command</div>
              <div className="text-white text-lg font-medium">
                Update the sales agent so that it knows about the 10% off site-wide deal
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-2 border border-gray-800">
              <div className="text-sm font-medium text-gray-400 mb-2">Response</div>
              <div className="text-emerald-400 font-medium mb-2">
                ✨ All agents' prompt updated to include site-wide deal
              </div>
              <div className="flex flex-wrap gap-2.5 mt-4 mb-2">
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
              <div className="space-y-2 text-sm text-gray-400">
                <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-800">
                  <div className="text-gray-500 mb-1.5">Previous First Message:</div>
                  <div className="text-gray-400">"{firstMessages[selectedLanguage.locale]}"</div>
                </div>
                <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-800">
                  <div className="text-gray-500 mb-1.5">Updated First Message:</div>
                  <div className="text-gray-300">"{firstMessagesAfter[selectedLanguage.locale]}"</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}