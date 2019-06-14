import React from "react";
import UserGrid from "../Profile/UserGrid";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Posts from "../Posts";

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 305px);
  justify-content: center;
  gap: 20px;
  grid-auto-rows: 305px;  
  ${({toggled}) => toggled && css `
   grid-auto-rows: 200px;
   grid-gap: 5px;  
  `}
  @media (max-width: 990px) {
    gap: 5px;
    grid-template-columns: repeat(3 , 1fr);
    grid-auto-rows: calc(33vw - 5px);
  }
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const TabLink = styled(Link)`
  text-decoration: none;
  color: #9c0004;
  font-weight: bold;
  ${({selected}) => selected && 'color: black;'}
`

const ImageLink = styled(Link)`
  background: no-repeat center/150% url(/img/${({index}) => index}.jpg);
  :hover {
    opacity: 0.7; 
  }
  ${({toggled}) => toggled && css`
    background-size: cover;
    &:nth-of-type(2n) {
      grid-row-start: span 2;
    }
  `}
`




export function Gallery({ match, location }) {
    const toggled = location.search === '?type=veta'
  return (
    <div>
      <UserGrid />
      <LinkGrid>
        <TabLink selected={!toggled} to={`${match.url}`}>Vi Erbjuder</TabLink>
        <TabLink selected={toggled} to={{ pathname: `${match.url}`, search: "?type=veta" }}>
          Bra Att Veta
        </TabLink>
        <TabLink>Hitta Motaggning</TabLink>
        <TabLink>Om Oss</TabLink>
      </LinkGrid>
      <PhotoGrid toggled={toggled}>
        {Posts.map(i => (
          <ImageLink
           toggled={toggled}
            key={i.id}
            index={i.id}
            to={{
              pathname: `/img/${i.id}`,
              // this is the trick!
              state: { modal: true }
            }}
          >            
          </ImageLink>
        ))}
      </PhotoGrid>
    </div>
  );
}
