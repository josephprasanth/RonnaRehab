import React from "react";
import UserGrid from "../Profile/UserGrid";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Posts from "../Posts";
import { Image } from "../App";

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 305px);
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;  
  ${({toggled}) => toggled && css `
  border: 2px solid blue;  
  `}
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
          <Link
            key={i.id}
            to={{
              pathname: `/img/${i.id}`,
              // this is the trick!
              state: { modal: true }
            }}
          >
            <Image index={i.id} />
          </Link>
        ))}
      </PhotoGrid>
    </div>
  );
}
