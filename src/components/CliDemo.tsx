import React from 'react';
import { Bot, Languages, CheckCircle } from 'lucide-react';
import { CodeBlock } from './codeblock';

export default function CliDemo() {
  const steps = [
    {
      title: 'Step 1: define config in convai.yaml',
      language: 'yaml',
      code: `
locales:
  - en
  - es
  - fr
default_locale: en
specification_locale: en
      `,
    },
    {
      title: 'Step 2: specify a new conversational agent in convai-agents/[agent-name].yaml',
      language: 'yaml',
      code: `
first_message: "Hello! How can I assist you today?"
system_prompt: "You are a helpful assistant."
llm_provider: gpt-4o
      `,
    },
    {
      title: 'Step 3: update or create a new agent with a sync',
      language: 'sh',
      code: `$ convAI sync`,
    },
    {
      title: 'Step 4: use our component immediately',
      language: 'jsx',
      code: `<ConvAI agent-id="agent-name" locale="en" />`,
    },
  ];

  return (
    <div className="rounded-xl bg-gray-900/95 p-5 shadow-2xl backdrop-blur-sm border border-gray-800 flex flex-col" style={{ height: '460px' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <span className="text-white font-semibold text-lg">Deploy multilingual conversational agents in 60 seconds</span>
        </div>
      </div>
      
      <div className="space-y-2 overflow-y-auto flex-1 pr-2">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-800/70 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-400 mr-2" />
              <h3 className="text-sm text-gray-400">{step.title}</h3>
            </div>
            <CodeBlock
              language={step.language}
              darkMode={true}
              value={step.code}
            />
          </div>
        ))}
        
        <div className="p-2 rounded-lg bg-gray-800/30 border border-gray-800 text-emerald-400 font-medium">
          ✨ Congrats! Your first agent is deployed with out-of-the-box multilingual analytics
        </div>
      </div>
    </div>
  );
}