import styled from 'styled-components';
import { Text } from '../components/atoms/Text';
import { TodoList } from '../components/organisms/TodoList';
import { TodoForm } from '../components/organisms/TodoForm';
import { useTodos } from '../hooks/useTodos';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.header`
  margin-bottom: 32px;
  text-align: center;
`;

export const Home = () => {
    const { todos, addTodo, toggleTodoCompletion, deleteTodo, updateTodo } = useTodos();
  
    return (
      <Container>
        <Header>
          <Text variant="h1">Todoリスト</Text>
          <Text variant="p">タスクを管理しましょう</Text>
        </Header>
        
        <TodoForm onAddTodo={addTodo} />
        <TodoList 
          todos={todos} 
          onToggleTodo={toggleTodoCompletion} 
          onEditTodo={updateTodo}
          onDeleteTodo={deleteTodo} 
        />
      </Container>
    );
  };

  export default Home;