import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { logout } from "../redux/userRedux";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LogoutIcon from '@mui/icons-material/Logout'

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Admin = styled.a`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  text-decoration: none;
  font: bold;
  color: black;
  font-size: 1rem;
`;

const Logout = styled.button`
  font-size: 10px;
  cursor: pointer;
  margin-left: 10px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  text-decoration: none;
  font: bold;
  color: black;
  font-size: 1rem;
  border: none;
  background: none;
`;

const Avatar = styled.img`
    margin-left: 18px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const quantity = useSelector(state=>state.cart.quantity);
  const logoutUser = () => {
    toast("Logout successfull", { type: "success" });
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Link to="/" style={{textDecoration: "none", color: "black"}}>
        <Center>
          <Logo>Book Store</Logo>
        </Center>
        </Link>
        <Right>
          <Admin href="#about">About us</Admin>
          <Admin href="#contact">Contact us</Admin>
          <Admin target="_blank" href="https://book-website-admin.herokuapp.com" style={{textDecoration: "none"}}>
          Admin Login
          </Admin>
          <Logout onClick={logoutUser}><LogoutIcon /></Logout>
          
          <Link to="/cart" style={{color: "black"}}>
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
          <Avatar
            src={user.currentUser.img}
            alt="avatar"
            className="topAvatar"
          />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;