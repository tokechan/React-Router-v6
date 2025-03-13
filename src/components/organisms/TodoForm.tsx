import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 20px;
  gap: 8px;
`;

const StyledInput = styled(Input)`
  flex: 1;
`;

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        inputSize="medium"
        placeholder="新しいタスクを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />
      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={!text.trim()}
      >
        追加
      </Button>
    </StyledForm>
  );
};