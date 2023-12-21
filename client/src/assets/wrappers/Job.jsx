import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  padding: 2rem;
  span {
    margin-right: 1rem;
    text-align: left;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: 500;
  }
  header {
    padding: 1rem 1.5rem;
    width: min(140px, 80vw)
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: #1c6d8b;
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    font-weight: 800;
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
    // margin-bottom: 2rem;
  }
  .content-status{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  // .content-center {
  //   display: grid;
  //   grid-template-columns: 1fr;
  //   row-gap: 0.2rem;
  //   @media screen and (max-width: 480px) {
  //     grid-template-columns: 1fr;
  //   }
  //   @media screen and (min-width: 480px) {
  //     grid-template-columns: 1fr 1fr;
  //   }
  //   @media screen and (min-width: 769px) {
  //     grid-template-columns: 1fr 1fr;
  //   }
  //   @media screen and (min-width: 1201px) {
  //     grid-template-columns: 1fr;
  //   }
  // }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    background: #F0E2A4; 
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    width: 100px;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
  .img {
  width: min(400px, 80vw)
  height: min(360px, 70vh)
  
  }
`;

export default Wrapper;
