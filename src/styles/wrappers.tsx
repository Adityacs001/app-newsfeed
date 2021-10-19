import styled from "styled-components";

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
`;
const FooterWrapper = styled.div`
  flex-shrink: 0;
`;

export { MainWrapper, ContentWrapper, FooterWrapper };
