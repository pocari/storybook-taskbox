import React from 'react';
import InboxScreen from './InboxScreen';
import { rest } from 'msw';
import { mockedTasks } from './TaskList.stories';
import { RecoilRoot } from 'recoil';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        'http://localhost:33000/todo_items',
        (req, res, ctx) => {
          return res(ctx.json(mockedTasks));
        }
      ),
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        'http://localhost:33000/todo_items',
        (_req, res, ctx) => {
          return res(ctx.status(403));
        }
      )
    ]
  }
};
