import { CommandDefinitions } from '../types';

export default function commandExists(
  commands: CommandDefinitions,
  command: string,
  ignoreCase: boolean = false
): { exists: boolean; commandName: string } {
  if (ignoreCase) {
    const lowerCasedCommands = Object.keys(commands).map((cmd) => cmd.toLowerCase());
    const lowerCasedCommand = command.toLowerCase();
    const index = lowerCasedCommands.indexOf(lowerCasedCommand);
    return {
      exists: index !== -1,
      commandName: index !== -1 ? Object.keys(commands)[index] : command,
    };
  }

  return { exists: commands.hasOwnProperty(command), commandName: command };
}
