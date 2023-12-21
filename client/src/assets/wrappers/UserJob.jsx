import styled from "styled-components";

const Wrapper = styled.div`
  table {
    width: 100%;
  }
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  td {
    width: 100px;
  }
  thead,
  th {
    width: 33%;
    padding: 1rem;
  }
`;

export default Wrapper;
