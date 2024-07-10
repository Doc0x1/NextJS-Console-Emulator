import { Command, CommandDefinitions } from '../types';
import { addHistoryEntry } from './historyHandler';

export function executeCommand(
  cmd: string,
  commands: CommandDefinitions,
  history: Command[]
): { output: string; newHistory: Command[] } {
  const [commandName, ...args] = cmd.split(' ');
  const command = commands[commandName];

  if (!command) {
    const newHistory = addHistoryEntry(history, cmd, `Command not found: ${cmd}`);
    return { output: `Command not found: ${cmd}`, newHistory };
  }

  if (commandName === 'clear') {
    return { output: '', newHistory: [] }; // Reset history
  }

  const output = command.fn(args, commands);
  const newHistory = addHistoryEntry(history, cmd, output);

  return { output, newHistory };
}
