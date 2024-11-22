import React, { useState } from 'react';
import { Bot, BarChart3, Globe2, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supportedLanguages } from '../lib/supportedLanguages';

// Add interfaces for the props and data structures
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: number;
  description: string;
}

interface CommonIssue {
  issue: string;
  count: number;
}

interface LocalePerformance {
  locale: string;
  success_rate: number;
  common_issues?: CommonIssue[];
  improvement_areas?: string[];
}

interface LocalePerformanceCardProps {
  locale: LocalePerformance;
  className?: string;
}

export default function AnalyticsDemo() {
  const [activeView, setActiveView] = useState<'overview' | 'language'>('overview');

  const mockAnalytics = {
    overall: {
      success_rate: 94.2,
    },
    by_locale: [
      {
        locale: 'en-US',
        success_rate: 96.5,
        common_issues: [
          { issue: 'Technical jargon', count: 245 },
          { issue: 'Ambiguous context', count: 156 },
        ],
        improvement_areas: ['Simplify terminology', 'Add more context'],
      },
      {
        locale: 'es',
        success_rate: 93.2,
        common_issues: [
          { issue: 'Idiomatic expressions', count: 189 },
          { issue: 'Regional variations', count: 134 },
        ],
        improvement_areas: ['Regional adaptation', 'Literal translations'],
      },
      {
        locale: 'fr',
        success_rate: 92.8,
        common_issues: [
          { issue: 'Cultural nuances', count: 167 },
          { issue: 'Technical terms', count: 145 },
        ],
        improvement_areas: ['Cultural context', 'Technical vocabulary'],
      },
      {
        locale: 'de',
        success_rate: 95.1,
        common_issues: [
          { issue: 'Compound words', count: 178 },
          { issue: 'Technical accuracy', count: 132 },
        ],
        improvement_areas: ['Terminology consistency', 'Technical precision'],
      },
      {
        locale: 'zh',
        success_rate: 91.4,
        common_issues: [
          { issue: 'Cultural references', count: 234 },
          { issue: 'Context clarity', count: 187 },
        ],
        improvement_areas: ['Cultural adaptation', 'Context enhancement'],
      },
      {
        locale: 'ja',
        success_rate: 92.7,
        common_issues: [
          { issue: 'Honorifics', count: 156 },
          { issue: 'Cultural context', count: 143 },
        ],
        improvement_areas: ['Politeness levels', 'Cultural alignment'],
      },
    ],
    global_issues: [
      { issue: 'Technical terminology', affected_locales: ['en-US', 'de', 'fr', 'ja', 'zh'], count: 876 },
      { issue: 'Cultural references', affected_locales: ['zh', 'ja', 'hi', 'ar', 'ko'], count: 543 },
      { issue: 'Idiomatic expressions', affected_locales: ['es', 'fr', 'pt', 'it'], count: 432 },
      { issue: 'Regional variations', affected_locales: ['es', 'pt', 'ar', 'en-US'], count: 387 },
      { issue: 'Context clarity', affected_locales: ['zh', 'ja', 'ko', 'hi'], count: 298 },
    ],
  };

  const renderOverviewView = () => (
    <div className="space-y-4">
      {/* Global Performance Card */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-2">
        <h3 className="text-lg font-medium text-gray-200 mb-1">Global Agent Performance</h3>
        <div>
          <MetricCard
            title="Success Rate"
            value={`${mockAnalytics.overall.success_rate}%`}
            icon={<Target className="h-5 w-5 text-gray-300" />}
            trend={+2.1}
            description="% of calls in which conversational agent completes goal succesffuly"
          />
        </div>
      </div>

      {/* Common Issues Across Languages */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-2">
        <h3 className="text-lg font-medium text-gray-200">Common Issues</h3>
        <div className="space-y-3">
          {mockAnalytics.global_issues.map((issue, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-1">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-gray-200">{issue.issue}</h4>
                  <div className="flex gap-1 mt-1">
                    {issue.affected_locales.map(locale => {
                      const langInfo = supportedLanguages.find(l => l.locale === locale);
                      return langInfo && (
                        <div key={locale} className="p-1 bg-gray-700/50 rounded">
                          <langInfo.icon className="h-4 w-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <span className="text-gray-400">{issue.count} occurrences</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLanguageView = () => (
    <div className="grid grid-cols-2 gap-2">
      {mockAnalytics.by_locale.map(locale => (
        <LocalePerformanceCard
          key={locale.locale}
          locale={locale}
          className="hover:border-primary/50 transition-colors"
        />
      ))}
    </div>
  );

  return (
    <div className="rounded-xl bg-gray-900/95 p-5 shadow-2xl backdrop-blur-sm border border-gray-800 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-white font-semibold text-lg">Sales Agent Analytics</span>
        </div>
      </div>

      <div className="flex space-x-3 mb-4">
        <Button
          onClick={() => setActiveView('overview')}
          variant={activeView === 'overview' ? 'default' : 'secondary'}
          size="lg"
          className="gap-2"
        >
          <Globe2 className="h-4 w-4" />
          Global Overview
        </Button>
        <Button
          onClick={() => setActiveView('language')}
          variant={activeView === 'language' ? 'default' : 'secondary'}
          size="lg"
          className="gap-2"
        >
          <Bot className="h-4 w-4" />
          By Language
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="pr-2">
          {activeView === 'overview' ? renderOverviewView() : renderLanguageView()}
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ title, value, icon, trend, description }: MetricCardProps) => (
  <div className="bg-gradient-to-br from-gray-800/70 to-gray-800/50 rounded-xl p-4 border border-gray-700/50">
    <div className="flex items-center justify-between mb-2">
      <div className="p-2 bg-gray-700/30 rounded-lg">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        <span>{Math.abs(trend)}%</span>
      </div>
    </div>
    <div className="mt-3">
      <h3 className="text-2xl font-semibold text-gray-100">{value}</h3>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
    </div>
    <p className="text-xs text-gray-500 mt-2">{description}</p>
  </div>
);

const LocalePerformanceCard = ({ locale, className }: LocalePerformanceCardProps) => {
  const langInfo = supportedLanguages.find(l => l.locale === locale.locale);
  
  return (
    <div className={`group bg-gray-800/20 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 hover:border-primary/50 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-700/30 rounded-lg group-hover:bg-gray-700/50 transition-colors">
            {langInfo && <langInfo.icon className="w-4 h-4" />}
          </div>
          <h3 className="text-gray-100 font-medium">
            {langInfo?.native_name || locale.locale}
          </h3>
        </div>
        <span className="text-2xl font-semibold text-emerald-400">
          {locale.success_rate}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-700/50 rounded-full mb-4">
        <div 
          className="h-full bg-emerald-400 rounded-full transition-all duration-500"
          style={{ width: `${locale.success_rate}%` }}
        />
      </div>

      {/* Common Issues */}
      {locale.common_issues && (
        <div className="space-y-2 mb-4">
          {locale.common_issues.map((issue, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{issue.issue}</span>
              <span className="text-gray-500">{issue.count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Improvement Areas */}
      {locale.improvement_areas && (
        <div className="flex flex-wrap gap-2">
          {locale.improvement_areas.map((area, idx) => (
            <span 
              key={idx}
              className="inline-block px-2 py-1 text-xs text-emerald-400 bg-emerald-400/10 rounded-full"
            >
              {area}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
