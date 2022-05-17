import styled from "styled-components/native";

interface ButtonProps{
    size: 'full' | 'xl' | 'lg' | 'md' | 'sm';
    rounded:boolean;
}

const StyledButton = styled.TouchableOpacity<ButtonProps>`
    height:35px;
    margin:5px auto;
    width:${({size}) => {
    switch (size) {
        case 'full':return 100
        case 'xl': return 80
        case 'lg': return 60
        case 'md': return 50
        case 'sm': return 30
        default:return 100
    }}}%;
    border-radius:${({rounded})=> rounded ? '20px': '10px'};
    align-items:center;
    justify-content:center;
`

const StyledText = styled.Text`
    font-size:20px;
`

export const StyledButtonPrimary = styled(StyledButton)`
    background-color: #1345cb;
    border-width:1px;
    border-color:rgb(255,255,255);
`
export const StyledTextPrimary = styled(StyledText)`
    color:white;
`

export const StyledButtonSecondary = styled(StyledButton)`
    background-color:white;
    border-width:2px;
    border-color: #1345cb;
`

export const StyledTextSecondary = styled(StyledText)`
    color:  #1345cb;;
`

export const StyledButtonTertiary = styled(StyledButton)`
`

export const StyledTextTertiary = styled(StyledText)`
    color: #1345cb;
`