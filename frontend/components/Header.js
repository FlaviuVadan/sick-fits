import Nav from './Nav.js';
import Link from 'next/link';
import styled from 'styled-components';

// again, using a constant styling variable, tag template literal
// notice the use of media query to center when we hit < 1300px
const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    a {
        padding: 0.5rem 1rem;
        background: ${props => props.theme.red};
        color: ${props => props.theme.offWhite};
        text-transform: uppercase;
        text-decoration: none
    }
    @media (max-width: ${props => props.theme.mediaWidth})
        margin: 0;
        text-align: center;
`;

const StyledHeader = styled.header`
    .bar {
        border-bottom: 10px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width: ${props => props.theme.mediaWidth}) {
            grid-template-columns: 1fr;
            justify-content: center;     
        }
    }
    .sub-bar{
        display: grid;
        grid-template-columns: auto 1fr;
        border-bottom: 1px solid ${props => props.theme.lightgrey}:
    }
`;

const Header = () => (
    <StyledHeader>
        <div className="bar">
            <Logo>
                <Link href="/">
                    <a>Sick Fits</a>
                </Link>
            </Logo>
            <Nav/>
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <div>Cart</div>
    </StyledHeader>
);

export default Header;