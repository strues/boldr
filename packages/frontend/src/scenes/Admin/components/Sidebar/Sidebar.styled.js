import styled from 'styled-components';

export const SidebarStyled = styled.div`height: 100%;`;

export const SidebarNavItemLink = styled.a`
  display: block;
  color: ${props => props.theme.fontColor.light};
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-decoration: none;
  letter-spacing: 1.3;

  &:active,
  &:focus,
  &:hover {
    color: ${props => props.theme.palette.primaryAccent};
    text-decoration: none;
  }
`;
