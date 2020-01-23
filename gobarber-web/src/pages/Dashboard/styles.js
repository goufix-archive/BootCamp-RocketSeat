import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  border: 3px solid
    ${props =>
      props.available && !props.past ? '#07bc0c' : lighten(0.03, '#7159c1')};

  opacity: ${props => (props.past ? 0.3 : 1)};

  strong {
    display: block;
    color: #999;
    font-size: 20px;
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
    color: #999;
  }
`;
