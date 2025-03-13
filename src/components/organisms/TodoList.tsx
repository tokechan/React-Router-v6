import React from 'react';
import styled from 'styled-components';
import { TodoItem } from '../molecules/TodoItem';
import { Text } from '../atoms/Text';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo?: (id: number, newText: string) => void;
}

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #333;
`;

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    return (
      <EmptyState>
        <Text variant="h4" align="center">タスクがありません</Text>
        <Text variant="p" align="center">新しいタスクを追加してください</Text>
      </EmptyState>
    );
  }

  return (
    <StyledTodoList>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </StyledTodoList>
  );
};