import styled from "styled-components/native";

interface HeadingProps{
    color: 'primary' | 'secondary' | 'tertiary';
}

const colorVariants = {primary: 'rgba(0,0,0,0.6)', secondary: 'rgba(0,0,0,0.4)', tertiary:'gray'}

export const StyledHeading = styled.Text<HeadingProps>`
    color:${({color})=>colorVariants[color]};
    font-size:60px;
    font-family:Knewave;
    text-align:center;
    color:rgba(0,0,0,0.8);
`