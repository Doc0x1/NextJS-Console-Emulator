import React, { useState, useEffect, useRef } from 'react';
import validateCommand from '../handlers/validateCommand';
import { executeCommand } from '../handlers/executeCommand';
import { Command, CustomCommand, CommandDefinitions } from '../types';
import TerminalInput from './TerminalInput';
import TerminalOutput from './TerminalOutput';
import '../styles/styles.css'; // Import your CSS file

interface TerminalProps {
  initialCommand?: string;
  customCommands?: CustomCommand[];
  prompt?: string;
  width?: string;
  height?: string;
}

const Terminal: React.FC<TerminalProps> = ({
  initialCommand,
  customCommands = [],
  prompt = '$',
  width = '600px', // Default width
  height = '400px', // Default height
}) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const customCommandDefs: CommandDefinitions = customCommands.reduce((acc, customCommand) => {
    acc[customCommand.command] = customCommand;
    return acc;
  }, {} as CommandDefinitions);

  const validatedCommands = validateCommand(customCommandDefs, { noDefaults: false, ignoreCommandCase: true });

  useEffect(() => {
    if (initialCommand) {
      handleCommandExecution(initialCommand);
    }
  }, [initialCommand]);

  const handleCommandExecution = (cmd: string) => {
    if (!cmd.trim()) {
      const newHistory = [...history, { command: cmd, output: '' }];
      setHistory(newHistory);
      return;
    }

    const { newHistory } = executeCommand(cmd, validatedCommands, history);
    setHistory(newHistory);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandExecution(command);
      setCommand('');
      setCurrentCommandIndex(null);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const newIndex = currentCommandIndex === null ? history.length - 1 : currentCommandIndex - 1;
        if (newIndex >= 0) {
          setCommand(history[newIndex].command);
          setCurrentCommandIndex(newIndex);
        }
      }
    } else if (e.key === 'ArrowDown') {
      if (history.length > 0 && currentCommandIndex !== null) {
        const newIndex = currentCommandIndex + 1;
        if (newIndex < history.length) {
          setCommand(history[newIndex].command);
          setCurrentCommandIndex(newIndex);
        } else {
          setCommand('');
          setCurrentCommandIndex(null);
        }
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="terminal"
      role="textbox"
      tabIndex={0}
      onClick={() => inputRef.current?.focus()}
      onKeyDown={() => inputRef.current?.focus()}
      style={{ width, height }} // Set the width and height based on props
    >
      <TerminalOutput history={history} prompt={prompt} />
      <TerminalInput
        prompt={prompt}
        command={command}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        inputRef={inputRef}
      />
    </div>
  );
};

export default Terminal;
