import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../app/redux/store';
import Block from '../app/components/Block';

import "../appli/globals.css"

export const MockedProvider = ({data = {
    id: '1',
    order: 1,
    note_id: '1',
    type: 'h1',
    url: '',
    content: 'This is a Mocked Provider',
    author: 'Author 1',
    created_at: '2021-01-01',
    edited_at: '2021-01-01',
}} : {data : any}) => (
    <Provider store={store}>
        <Block data={data} />
    </Provider>
);


const meta = {
    title: 'Example/Block',
    component: MockedProvider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} satisfies Meta<typeof Block>;

export default meta;

type Story = StoryObj<typeof meta>;

export const h1: Story = {
    args: {
        data : {
            id: '1',
            order: 1,
            note_id: '1',
            type: 'h1',
            url: '',
            content: 'This is a note 1',
            author: 'Author 1',
            created_at: '2021-01-01',
            edited_at: '2021-01-01',
        }
    },
};

export const h2: Story = {
    args: {
        data : {
            id: '2',
            order: 2,
            note_id: '1',
            type: 'h2',
            url: '',
            content: 'This is a note 2',
            created_at: '2021-01-01',
            edited_at: '2021-01-01',
        }
    },
};

export const h3: Story = {
    args: {
        data : {
            id: '3',
            order: 3,
            note_id: '1',
            type: 'h3',
            url: '',
            content: 'This is a note 3',
            created_at: '2021-01-01',
            edited_at: '2021-01-01',
        }
    },
};

export const text: Story = {
    args: {
        data : {
            id: '4',
            order: 4,
            note_id: '1',
            type: 'text',
            url: '',
            content: 'This is a note 4',
            created_at: '2021-01-01',
            edited_at: '2021-01-01',
        }
    },
};

export const image: Story = {
    args: {
        data : {
            id: '5',
            order: 5,
            note_id: '1',
            type: 'image',
            url: 'https://via.placeholder.com/150',
            content: 'This is a note 5',
            created_at: '2021-01-01',
            edited_at: '2021-01-01',
        }
    },
}

export const bullet_list: Story = {
    args: {
        data : {
            id: '6',
            order: 6,
            note_id: '1',
            type: 'bullet_list',
            url: '',
            content: 'This is a note 6',
            created_at: '2021-01-01',
            edited_at: '2021-01-01',
        }
    },
}

export const number_list: Story = {
    args: {
        data : {
            id: '7',
            order: 7,
            note_id: '1',
            type: 'number_list',
            url: '',
            content: 'This is a note 7',
            created_at: '2021-01-01',
            edited_at: '2021-01-01',
        }
    },
}