// @flow

import React, { Component } from 'react';
import { Animated, Easing, SafeAreaView } from 'react-native';

import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

import Header from '../../components/common/Header';
import Button from '../../components/Button';
import { IMAGES } from '../../utils/design/images';
import { ROUTENAMES } from '../../navigation/RouteNames';
import LinearGradient from 'react-native-linear-gradient';
import GradientWrapper from '../../components/GradientWrapper';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primaryColor}
  padding: 20px;
`;

const LoginButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const LoginText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-weight: 800;
  font-size: 24px;
  text-align: right;
`;

const TextWrapper = styled.View`
  flex: 2;
`;

const BigText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 34px;
  font-weight: 800;
  margin-top: 20px;
`;

const ButtonsWrapper = styled.View`
  flex: 3;
  justify-content: flex-start;
`;

const BottomFixedReactLogo = styled.Image.attrs({
  source: IMAGES.REACT,
})`
  width: 303;
  height: 271.39;
  position: absolute;
  right: -100;
  bottom: -90;
  tint-color: rgba(0,0,0,0.1);
`;

const FacebookLogo = styled.Image.attrs({
  source: IMAGES.FB,
})`
  width: 20px;
  height: 28px;
  margin: 0 15px 5px 0;
  tint-color: ${props => props.theme.colors.primaryColor};
`;

const FacebookButtonText = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-size: 20px;
  font-weight: 600;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 20px;
  font-weight: 600;
`;

const AnimatedImage = styled(Animated.Image).attrs({
  source: IMAGES.REACT,
})`
  width: 100;
  height: 88;
  tint-color: ${props => props.theme.colors.secondaryColor};
`;

const WrapperGradient = styled(LinearGradient).attrs({
  colors: ['rgb(41, 123, 247)', '#651FFF'],
  start: { x: 0.0, y: 0.25 },
  end: { x: 0.5, y: 1.0 },
})`
  flex: 1;
  padding: 20px;
`;

type Props = {};

type State = {};

@withNavigation
export default class AuthScreen extends Component<any, Props, State> {
  constructor() {
    super();
    this.animationValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.animationValue.setValue(0);
    Animated.timing(this.animationValue, {
      toValue: 1,
      duration: 8500,
      easing: Easing.linear,
    }).start(() => this.spin());
  }

  render() {
    const { navigation } = this.props;
    const spin = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <GradientWrapper>
        <Header>
          <LoginButton onPress={() => navigation.navigate(ROUTENAMES.LOGIN)}>
            <LoginText>Login</LoginText>
          </LoginButton>
        </Header>
        <TextWrapper>
          <AnimatedImage
            style={{
              transform: [{ rotate: spin }],
            }}
          />
          <BigText>Welcome to React Brasil Events</BigText>
        </TextWrapper>
        <ButtonsWrapper>
          <Button fill>
            <FacebookLogo />
            <FacebookButtonText>Continue with Facebook</FacebookButtonText>
          </Button>
          <Button onPress={() => navigation.navigate(ROUTENAMES.REGISTER)}>
            <ButtonText>Create an Account</ButtonText>
          </Button>
        </ButtonsWrapper>
        <BottomFixedReactLogo />
      </GradientWrapper>
    );
  }
}
