import styled from "styled-components";

const Wrapper = styled.article`
  // background: var(--white);
  background: #00aab9;
  border-radius: var(--borderRadius);
  display: grid;
  // gap: 20px 20px;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  // margin-left: 20px;
  padding: 20px;

  .profile-icon {
    // background: var(--white);
    // border-radius: 25px;
    // width: 120px;
    // height: 120px;
    // display: grid;
    // place-items: center;
    font-size: 34px;
    text-transform: uppercase;
  }

  .info p {
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 0.25rem;
  }
`;

export default Wrapper;
