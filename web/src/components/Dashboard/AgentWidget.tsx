"use client"
import { useEffect } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    'agent-id'?: string;
  }
}

type ElevenLabsConvaiProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': ElevenLabsConvaiProps;
    }
  }
}

interface AgentWidgetProps {
  agentId: string;
}

export function AgentWidget({ agentId }: AgentWidgetProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="convai-widget"]')) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <elevenlabs-convai agent-id={agentId} className="animate-fadeInUpOnce" />;
} 