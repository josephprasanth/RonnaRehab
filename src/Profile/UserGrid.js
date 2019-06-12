import React from "react";
import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";

const UserGridStyled = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 50px;
  gap: 15px;
  grid-template-areas:
    "photo name"
    "photo label"
    "photo description";

  @media (max-width: 990px) {
    grid-template-areas:
      "photo name"
      "label . "
      "description .";
  }
`

export const MiniUserGrid = styled.div`
  display: grid;
  justify-content: left;
  grid-template-columns: auto auto;
  gap: 10px;
`;
const Photo = styled.div`
  grid-area: photo;
`;
const Name = styled.div`
  grid-area: name;
  font-size: 35px;
`;
const Label = styled.div`
  grid-area: label;
`;
const Description = styled.div`
  grid-area: description;
  max-width: 400px;
`;

export default function() {
  return (
    <UserGridStyled>      
      <Photo>
        <ProfileImage />
      </Photo>
      <Name>Ronna Rehab Gallery</Name>
      <Label>
        <strong>4000 </strong>Medlemmar
      </Label>
      <Description>
        Vi är en primärvårdsrehab belägen våningen under Ronna Vårdcentral i
        Ronna Centrum i Södertälje. Vi erbjuder Fysioterapeuter,
        Arbetsterapeuter, Dietist och Lymfterapeut. Här skräddarsyr vi Ditt
        rehabiliteringsprogram samt sätter in den kompetens som behövs i varje
        enskilt fall.
      </Description>
    </UserGridStyled>
  );
}
