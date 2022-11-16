import React from 'react';
import { RecoilRoot } from 'recoil';
import TaskList from '../components/TaskList';
import * as TaskStories from './Task.stories';
import { taskListBoxState } from '../store';

const MockedComponent = (props) => {
  const setTaskListBox = taskListBoxState.useSetTaskListBox();
  setTaskListBox(props);

  return <TaskList />
};

export default {
  component: MockedComponent,
  title: 'TaskList',
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
};

const Template = args => <MockedComponent {...args}/>;

const defaultTasks = [
  { ...TaskStories.Default.args, id: '1', title: 'Task 1' },
  { ...TaskStories.Default.args, id: '2', title: 'Task 2' },
  { ...TaskStories.Default.args, id: '3', title: 'Task 3' },
  { ...TaskStories.Default.args, id: '4', title: 'Task 4' },
  { ...TaskStories.Default.args, id: '5', title: 'Task 5' },
  { ...TaskStories.Default.args, id: '6', title: 'Task 6' },
]

export const Default = Template.bind({});
Default.args = {
  tasks: defaultTasks,
  loading: false,
}

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  tasks: [
    ...defaultTasks.slice(0, 5),
    { ...TaskStories.Default.args, id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
  ],
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
}

export const Empty = Template.bind({});
Empty.args = {
  tasks: [],
  loading: false
}

