import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Books</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Books:</FilterText>
          <Select>
            <Option disabled selected>
              Types
            </Option>
            <Option>Programming</Option>
            <Option>Cryptography</Option>
            <Option>Database</Option>
            <Option>Devops</Option>
            <Option>Linux</Option>
            <Option>Hacking</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Stages
            </Option>
            <Option>Beginner</Option>
            <Option>Mid-Beginner</Option>
            <Option>InterMediate</Option>
            <Option>Advance</Option>
            <Option>Expret</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Books:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;