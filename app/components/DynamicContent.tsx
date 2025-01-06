// components/DynamicComponents.tsx
'use client';

import dynamic from 'next/dynamic';

const LoadingFallback = () => <div className="animate-pulse">Loading...</div>;

export const Hero = dynamic(() => import('./Hero'), { 
  loading: LoadingFallback
});

export const DynamicBarbaWrapper = dynamic(() => import('./BarbaWrapper'), { 
  loading: LoadingFallback
});

export const DynamicChatBot = dynamic(() => import('./ChatBot'), { 
  loading: LoadingFallback
});

export const DynamicClientWrapper = dynamic(() => import('./ClientWrapper'), { 
  loading: LoadingFallback
});