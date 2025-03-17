import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import styled from "styled-components";
import { Text, Button } from "../components/atoms";

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

const DetailContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  width: 100%;
  margin-bottom: 24px;
  box-sizing: border-box;
`;

const TodoContent = styled.div`
  margin-bottom: 24px;
  padding: 16px 24px;
  background-color: #fff9f0;
  border-radius: 8px;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

const TodoDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { todos, deleteTodo } = useTodoContext();
    const todo = todos.find((t) => t.id === Number(id));
    
    if (!todo) {
        return (
            <Container>
                <Header>
                    <Text variant="h1">共有メモ詳細</Text>
                    <Text variant="p">メモが見つかりませんでした</Text>
                </Header>
                <Button variant="secondary" size="medium" onClick={() => navigate("/")}>
                    ホームに戻る
                </Button>
            </Container>
        );
    }

    const handleDelete = () => {
        deleteTodo(Number(id));
        navigate("/");
    };

    return (
        <Container>
            <Header>
                <Text variant="h1">共有メモ詳細</Text>
                <Text variant="p">大切な共有内容を確認しましょう</Text>
            </Header>

            <DetailContainer>
                <Text variant="h2">内容</Text>
                <TodoContent>
                    <Text variant="p">{todo.text}</Text>
                </TodoContent>
                
                <ButtonGroup>
                    <Button 
                        variant="primary" 
                        size="medium" 
                        onClick={() => navigate(`/todo/${todo.id}/edit`)}
                    >
                        編集する
                    </Button>
                    <Button 
                        variant="danger" 
                        size="medium" 
                        onClick={handleDelete}
                    >
                        削除する
                    </Button>
                    <Button 
                        variant="secondary" 
                        size="medium" 
                        onClick={() => navigate("/")}
                    >
                        戻る
                    </Button>
                </ButtonGroup>
            </DetailContainer>
        </Container>
    );
};

export default TodoDetail;