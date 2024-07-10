import { CommandDefinitions } from '../types';
import commandExists from '../utils/commandExists';

interface ValidateCommandOptions {
  noDefaults?: boolean;
  ignoreCommandCase?: boolean;
}

const defaultCommands: CommandDefinitions = {
  help: {
    description: 'Show a list of available commands.',
    fn: (args: string[], commands?: CommandDefinitions) => {
      if (!commands) return 'No commands available.';
      if (args.length > 0) {
        const cmd = args[0];
        if (commands[cmd]) {
          return `${cmd}: ${commands[cmd].description}`;
        } else {
          return `No such command: ${cmd}`;
        }
      }
      return Object.keys(commands)
        .map((command) => `${command}: ${commands[command].description}`)
        .join('\n');
    },
  },
  clear: {
    description: 'Empty the terminal window.',
    fn: () => '',
  },
};

export default function validateCommand(
  commands: CommandDefinitions,
  options: ValidateCommandOptions = {}
): CommandDefinitions {
  let validCommands: CommandDefinitions = {};

  // Pre-register defaults
  if (!options.noDefaults) {
    validCommands = { ...defaultCommands };
  }

  for (const c in commands) {
    // Ensure command names are clean if matching commands case-insensitively
    if (options.ignoreCommandCase && /[^a-zA-Z0-9-_]/.test(c)) {
      throw new Error(
        `Command name '${c}' is invalid; command names can only contain latin characters (A-Z), numbers (0-9) and dashes/underscores (- or _)`
      );
    }

    const { exists } = commandExists(validCommands, c, options.ignoreCommandCase);

    // Check that command does not already exist
    if (exists) {
      throw new Error(
        `Attempting to override existing command '${c}'; please only supply one definition of a certain command, or set the noDefaults property to enable overriding of existing commands`
      );
    }

    // Check that command contains a function
    if (typeof commands[c].fn !== 'function') {
      throw new Error(
        `'fn' property of command '${c}' is invalid; expected 'function', got '${typeof commands[c].fn}'`
      );
    }

    // Add description if missing
    if (!commands[c].description) commands[c].description = 'None';

    // Pass validation
    validCommands[c] = commands[c];
  }

  return validCommands;
}
