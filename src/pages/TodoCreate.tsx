import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "../components/atoms";
import { Input } from "../components/atoms";
import { Button } from "../components/atoms";
import styled from "styled-components";
import { useTodoContext } from "../context/TodoContext";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const FormContainer = styled.div`
  background-color: pink;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

const StyledInput = styled(Input)`
  max-width: 500px;
  text-align: center;
`;

const TodoCreate = () => {
    const navigate = useNavigate();
    const { addTodo } = useTodoContext();
    const [text, setText] = useState("");

    const handleCreate = () => {
        if(!text.trim()) return;
        addTodo(text);
        navigate("/");
    };

    const handleCancel = () => {
        navigate("/");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            handleCreate();
        }
    };

    return (
        <Container>
            <Header>
                <Text variant="h1">現状共有でーす</Text>
                <Text variant="p">これでモレをなくそう</Text>
            </Header>

            <FormContainer>
                <FormGroup>
                    <Text variant="label">共有すること</Text>
                    <StyledInput
                        $inputSize="large"
                        $fullWidth
                        placeholder="共有しまーす"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </FormGroup>

                <ButtonGroup>
                    <Button
                        variant="primary"
                        size="medium"
                        onClick={handleCreate}
                        disabled={!text.trim()}
                    >
                        書き記す
                    </Button>
                    <Button
                        variant="secondary"
                        size="medium"
                        onClick={handleCancel}
                    >
                        必要なかった
                    </Button>
                </ButtonGroup>
            </FormContainer>
        </Container>
    );
};

export default TodoCreate;