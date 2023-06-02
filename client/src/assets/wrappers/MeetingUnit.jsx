import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: 1fr auto;
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
    background: #4b6f7d;
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-button: 0.25rem;
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .completed {
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media screen and (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 480px) {
      grid-template-columns: 1fr;
    }
    @media screen and (min-width: 480px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 769px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 1201px) {
      grid-template-columns: 1fr;
    }
  }

  // Todo: Need to Recheck
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }

  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
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

  div {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
  }

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }

  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Wrapper;
