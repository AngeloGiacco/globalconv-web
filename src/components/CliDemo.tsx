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
      title: 'Step 2: create a new agent config in convai-agents/[agent-name].yaml for specification_locale',
      language: 'yaml',
      code: `
first_message: "Hello! How can I assist you today?"
system_prompt: "You are a helpful assistant."
llm_provider: openai
      `,
    },
    {
      title: 'Step 3: deploy the agent (or update agent-specific configs)',
      language: 'sh',
      code: `$ convai sync`,
    },
    {
      title: 'Step 4: Use the Component',
      language: 'jsx',
      code: `<Convai agent-id="my-agent" locale="en" />`,
    },
  ];

  return (
    <div className="rounded-xl bg-gray-900 p-6 shadow-xl overflow-y-auto max-h-96">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-white font-bold text-lg">Deploy agents in 60 seconds</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <h3 className="text-sm text-gray-300">{step.title}</h3>
            </div>
            <CodeBlock
              language={step.language}
              darkMode={true}
              value={step.code}
            />
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 mt-6 bg-yellow-100 p-3 rounded-lg">
        Congrats! Your first agent is deployed with out-of-the-box multilingual analytics
      </div>
    </div>
  );
}