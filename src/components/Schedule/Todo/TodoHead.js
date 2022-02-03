import React from 'react';
import styled from 'styled-components';

const TodoHeadBlock = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;

  .tasks-left {
    color: #6c757d;
    font-size: 18px;
    margin-top: 1rem;
    font-weight: bold;
    font-family: pretandard;
  }
`;

function TodoHead() {
  return (
    <TodoHeadBlock>
      <div className="tasks-left">할 일 2개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
