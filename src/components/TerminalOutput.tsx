import React from 'react';
import { Command } from '../types';
import TerminalMessage from './TerminalMessage';

interface TerminalOutputProps {
  history: Command[];
  prompt: string;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ history, prompt }) => {
  return (
    <>
      {history.map((entry, index) => (
        <div key={index}>
          <div className="terminal-input-line">
            <span className="terminal-prompt">{prompt}</span> {entry.command}
          </div>
          <div className="terminal-output-content">
            <TerminalMessage message={entry.output} />
          </div>
        </div>
      ))}
    </>
  );
};

export default TerminalOutput;
