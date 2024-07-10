import { Command } from '../types';

export function addHistoryEntry(history: Command[], command: string, output: string): Command[] {
  return [...history, { command, output }];
}
