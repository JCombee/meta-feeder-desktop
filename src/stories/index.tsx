import React from 'react';
import '../css/tailwind.css';

import { storiesOf } from '@storybook/react';

import Home from '../Pages/Home';

storiesOf('Home', module).add('to Storybook', () => <Home />);
