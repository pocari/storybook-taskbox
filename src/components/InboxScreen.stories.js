import React from 'react';
import InboxScreen from './InboxScreen';
import { rest } from 'msw';
import { mockedTasks } from './TaskList.stories';
import { RecoilRoot } from 'recoil';
import {
  userEvent,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@storybook/testing-library';

import {
  expect
} from '@storybook/jest';

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

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
  await waitFor(async () => {
    userEvent.click(canvas.getByLabelText('pinTask-1'));
    userEvent.click(canvas.getByLabelText('pinTask-3'));
  });
}

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
