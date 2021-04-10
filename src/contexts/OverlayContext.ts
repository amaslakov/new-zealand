import { createContext } from 'react';

export interface OverlayState {
  open: boolean;
  src: string;
  alt?: string;
  sourceNode: (EventTarget & HTMLDivElement) | null;
  transitionState: 'enter' | 'entering' | 'exiting' | 'exited';
}

export interface OverlayContextData extends OverlayState {
  setState(state: Partial<OverlayState>): void;
}

export const OverlayContext = createContext<OverlayContextData>({
  open: false,
  src: '',
  alt: '',
  sourceNode: null,
  transitionState: 'exited',
  setState: () => {},
});
