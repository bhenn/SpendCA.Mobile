import React from 'react';
import { storiesOf } from '@storybook/react-native';
import MaskInput from './MaskInput'
import Input  from "./Input";

storiesOf('Mask Input', module).add('INPUT', () => <MaskInput/>);

storiesOf('Input', module).add('Shake', () => <Input/>);

// storiesOf('Button', module)
//   .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
//   .add('with text', () => (
//     <Button onPress={action('clicked-text')}>
//       <Text>Hello Button</Text>
//     </Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onPress={action('clicked-emoji')}>
//       <Text>😀 😎 👍 💯</Text>
//     </Button>
//   ));
