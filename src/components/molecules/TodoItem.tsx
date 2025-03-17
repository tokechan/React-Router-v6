import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from '../atoms/Checkbox';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { useNavigate } from 'react-router-dom';


export interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (id: number, newText: string) => void;
}

const StyledTodoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const TodoTextWrapper = styled.div`
  flex: 1;
  margin: 0 16px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TodoText = styled(Text)<{ $completed: boolean }>`
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  color: ${props => props.$completed ? '#718096' : '#333'};
`;

const DeleteButton = styled(Button)`
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
`;

const EditButton = styled(Button)`
  opacity: 0.6;
  margin-left: 8px;

  &:hover {
    opacity: 1;
  }
`;

const EditInput = styled(Input)`
  flex: 1;
  margin: 0 16px;   
  $fullWidth
`;


export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const navigate = useNavigate();

  const handleToggle = () => {
    onToggle(id);
  };
  
  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    navigate(`/todo/${id}/edit`);
  };
  
  const handleSave = () => {
    if (editText.trim() && onEdit) {
        onEdit(id, editText);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleSave();
    } else if(e.key === 'Escape'){
        handleCancel();
    }
  };

  const handleTextClick = () => {
    if(!isEditing) {
        navigate(`/todo/${id}`);    
    }
  }
  
  return (
    <StyledTodoItem>
      <Checkbox
        checked={completed}
        onChange={handleToggle}
        aria-label={`Mark "${text}" as ${completed ? 'incomplete' : 'complete'}`}
      />

      {isEditing ? (
        <>
            <EditInput
            $inputSize="medium"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            />
            <Button 
            variant="primary"
            size="small"
            onClick={handleSave}
            >
              保存
            </Button>
            <Button 
            variant="danger"
            size="small"
            onClick={handleCancel}
            >
              キャンセル
            </Button>
        </>
      ) : (
        <>
        <TodoTextWrapper onClick={handleTextClick}>
          <TodoText
          variant="p"
          $completed={completed}
          >
              {text}
          </TodoText>
        </TodoTextWrapper>
        {onEdit && (
            <EditButton
            variant="secondary"
            size="small"
            onClick={handleEdit}
            aria-label={`Edit "${text}"`}
            >
              編集
            </EditButton>
        )}
        <DeleteButton
        variant="danger"
        size="small"
        onClick={handleDelete}
        aria-label={`Delete "${text}"`}
        >
          削除
        </DeleteButton>
        </>
      )}
    </StyledTodoItem>
  );
};