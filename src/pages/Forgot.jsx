import styled from "styled-components";
import {mobile} from "../responsive";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { publicRequest } from "../requestMethods";

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
  margin-bottom: 10px;
  margin-top: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [show , setShow] = useState(false);

  const sendEmail = async () => {
    const res = await publicRequest.post("/users/forgot", { 
      email
    })
    console.log(res);
  }

  const handleEmail = (e) => {
    e.preventDefault();
    if(!email){
      toast("please enter your registered Email", { type: "success" });
    } else {
      sendEmail();
      setShow(true);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <Container>
      {show ? (
        <Wrapper>
        <Title>The password Reset Link has been sent to {email} please check your inbox</Title>
          <Button onClick={handleClick}>
            Return Home
          </Button>
      </Wrapper>
      ): (
        <Wrapper>
        <Title>Forgot Password</Title>
        <Form>
        <Input
            placeholder="Enter a Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleEmail}>
            send
          </Button>
        </Form>
      </Wrapper>
      )}
    </Container>
  );
};

export default Forgot;