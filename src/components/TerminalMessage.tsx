import React from 'react';
import '../styles/styles.css';

interface TerminalMessageProps {
  message: string;
}

const TerminalMessage: React.FC<TerminalMessageProps> = ({ message }) => {
  return <div className="terminal-message">{message}</div>;
};

export default TerminalMessage;
