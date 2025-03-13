import styled from 'styled-components';
import { Text } from '../components/atoms/Text';
import { TodoList } from '../components/organisms/TodoList';
import { useTodoContext } from '../context/TodoContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
`;

const HeaderActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const TodoListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const Home = () => {
    const { todos, toggleTodoCompletion, deleteTodo, updateTodo } = useTodoContext();
    const navigate = useNavigate();

    const handleCreateNew = () => {
        navigate('/todo/new');
    };
  
    return (
      <Container>
        <Header>
          <Text variant="h1">夫婦の共有</Text>
          <Text variant="p">いつものこと💁🏼メモっとくねー📝</Text>
          <HeaderActions>
            <Button
              variant="primary"
              size="medium"
              onClick={handleCreateNew}
            >
              見てねー⚠️
            </Button>
          </HeaderActions>
        </Header>
        
        <TodoListWrapper>
          <TodoList 
            todos={todos} 
            onToggleTodo={toggleTodoCompletion} 
            onEditTodo={updateTodo}
            onDeleteTodo={deleteTodo} 
          />
        </TodoListWrapper>
      </Container>
    );
  };

  export default Home;