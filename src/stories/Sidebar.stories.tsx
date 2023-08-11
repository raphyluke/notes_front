import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../app/redux/store';
import Sidebar from '../app/components/Sidebar';

import "../appli/globals.css"

export const MockedProvider = () => (
    <Provider store={store}>
        <Sidebar />
    </Provider>
);


const meta = {
    title: 'Example/Sidebar',
    component: MockedProvider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} satisfies Meta<typeof Sidebar>;

export default meta;