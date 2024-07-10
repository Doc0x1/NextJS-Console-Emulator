import React from 'react';

interface TerminalInputProps {
  prompt: string;
  command: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  prompt,
  command,
  handleInputChange,
  handleKeyDown,
  inputRef,
}) => {
  return (
    <div className="terminal-input-line">
      <span className="terminal-prompt">{prompt}</span>
      <input
        type="text"
        value={command}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="terminal-input"
      />
    </div>
  );
};

export default TerminalInput;
