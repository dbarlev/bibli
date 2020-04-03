import React, { Component } from "react";
import styled from 'styled-components';
import SkipLink from '@govuk-react/skip-link';

const StyledSkipContainer = styled.div`
  text-align: center;
`;

const StyledSkipLink = styled(SkipLink)`
  text-decoration: none !important;
  font-size: 20px !important;
`;

class SkipLinks extends Component {

  constructor() {
    super();
  }

  render() {
    const { skipTo } = this.props;
    return (
      <StyledSkipContainer id="skipLinks">
        {
          skipTo && skipTo.map((skip) => {
            return <StyledSkipLink href={`#${skip.id}`}>{skip.text}</StyledSkipLink>
          })
        }
      </StyledSkipContainer>
    );
  }
}

export default SkipLinks;
