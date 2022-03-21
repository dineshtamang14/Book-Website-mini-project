import styled from "styled-components";
import {mobile} from "../responsive";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [changePassword, setChangePassword] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = async () => {
    await publicRequest.patch("/users/"+id, {
      id:id
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(password === changePassword){
      handleChange();
      toast("change password successfully", { type: "success" });
      navigate("/");
    } else {
        toast("please check your both password match or not", { type: "success" });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Change Password</Title>
        <Form>
        <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            type="password"
            onChange={(e) => setChangePassword(e.target.value)}
          />
          <Button onClick={handleClick}>
            change
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;