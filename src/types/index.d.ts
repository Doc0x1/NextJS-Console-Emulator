export interface Command {
  command: string;
  output: string;
}

export interface CustomCommand {
  command: string;
  description: string;
  fn: (args: string[], commands?: CommandDefinitions) => string;
}

export interface CommandDefinitions {
  [command: string]: {
    description: string;
    fn: (args: string[], commands?: CommandDefinitions) => string;
  };
}
