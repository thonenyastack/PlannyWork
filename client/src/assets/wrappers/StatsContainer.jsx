import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  .featuredChart {
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 10px;
  }
  .featuredHeader {
    display: flex;
    justify-content: space-between;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .featuredSummary {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .itemResult.positive {
      color: green;
    }
  }
`;
export default Wrapper;
