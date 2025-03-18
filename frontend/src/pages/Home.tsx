import styled from 'styled-components';
import { Text } from '../components/atoms/Text';
import { TodoList } from '../components/organisms/TodoList';
import { useTodoContext } from '../context/TodoContext';
import { useMemoContext } from '../context/MemoContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms';
import { useEffect, useState } from 'react';
import { memosToTodos } from '../adapters/MemoAdapter';

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
    const { memos, loading, error, fetchMemos, toggleMemoCompletion, deleteMemoItem, updateMemoItem } = useMemoContext();
    const navigate = useNavigate();
    const [displayTodos, setDisplayTodos] = useState(todos);
    
    // コンポーネントマウント時にメモを取得
    useEffect(() => {
      fetchMemos();
    }, []); // 依存配列を空にして初回レンダリング時のみ実行
    
    // メモデータをTodo型に変換して表示
    useEffect(() => {
      if (memos && memos.length > 0) {
        // メモデータがある場合はそれを表示
        setDisplayTodos(memosToTodos(memos));
      } else {
        // メモデータがない場合は既存のTodoデータを表示
        setDisplayTodos(todos);
      }
    }, [memos, todos]);

    const handleCreateNew = () => {
        navigate('/todo/new');
    };
    
    // メモの完了状態を切り替える
    const handleToggleTodo = (id: number) => {
      if (memos && memos.length > 0) {
        // メモデータを使用している場合
        const memo = memos.find(m => m.id === id);
        if (memo) {
          toggleMemoCompletion(id);
        } else {
          toggleTodoCompletion(id);
        }
      } else {
        // 既存のTodoデータを使用している場合
        toggleTodoCompletion(id);
      }
    };
    
    // メモを削除する
    const handleDeleteTodo = (id: number) => {
      if (memos && memos.length > 0) {
        // メモデータを使用している場合
        const memo = memos.find(m => m.id === id);
        if (memo) {
          deleteMemoItem(id);
        } else {
          deleteTodo(id);
        }
      } else {
        // 既存のTodoデータを使用している場合
        deleteTodo(id);
      }
    };
    
    // メモを編集する
    const handleEditTodo = (id: number, newText: string) => {
      if (memos && memos.length > 0) {
        // メモデータを使用している場合
        const memo = memos.find(m => m.id === id);
        if (memo) {
          updateMemoItem(id, { content: newText });
        } else if (updateTodo) {
          updateTodo(id, newText);
        }
      } else if (updateTodo) {
        // 既存のTodoデータを使用している場合
        updateTodo(id, newText);
      }
    };
  
    if (loading) {
      return (
        <Container>
          <Text variant="h4" align="center">読み込み中...</Text>
        </Container>
      );
    }
    
    if (error) {
      return (
        <Container>
          <Text variant="h4" align="center">エラーが発生しました</Text>
          <Text variant="p" align="center">{error}</Text>
        </Container>
      );
    }
  
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
              共有するべし⚠️
            </Button>
          </HeaderActions>
        </Header>
        
        <TodoListWrapper>
          <TodoList 
            todos={displayTodos} 
            onToggleTodo={handleToggleTodo} 
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo} 
          />
        </TodoListWrapper>
      </Container>
    );
  };

  export default Home;