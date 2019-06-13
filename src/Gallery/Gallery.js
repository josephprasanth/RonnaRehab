import React from 'react';
import UserGrid from '../Profile/UserGrid';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import Posts from "../Posts";
import { Image } from '../App';

const PhotoGrid = styled.div`
display: grid;
grid-template-columns: repeat(3,305px);
justify-content: center;
gap: 20px;
margin-bottom: 50px;
`
const LinkGrid = styled.div`
display: grid;
`

const TabLink = styled(Link)`
text-decoration: none;
color: black;
width: 50px;
`

export const Gallery = () => {
    return (
        <div>
     <UserGrid/>
      <PhotoGrid>
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