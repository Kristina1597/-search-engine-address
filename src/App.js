import {Component} from "react";
import {connect} from "react-redux";
import {theme} from "./Theme/theme";
import {ThemeProvider} from "@mui/material";
import styled from "styled-components";
import AddressFormContainer from "./Components/AddressFormContainer";

const Wrapper = styled.div`
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f7fafc;
  width: 70%;
  height: 85%;
  padding-top: 30px;
`;

class App extends Component {
    render() {
        return (
            <Wrapper>
                <ThemeProvider theme={theme}>
                    <AddressFormContainer  theme={theme} state={this.props.store}/>
                </ThemeProvider>
            </Wrapper>
        );
    }
}

export default connect(state => ({store: state.addressForm}))(App);