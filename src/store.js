import { atom, useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";

const useFetchTasks = () => {
  const fetchTasks = useRecoilCallback(
    ({set}) => async () => {
      console.log('------------------------fetchTasks');
      set(taskListBoxAtom, {
        tasks: [],
        error: false,
        loading: true,
      });
      try {
        const res = await fetch('http://localhost:33000/todo_items');
        const data = await res.json()
        const tasks = data.map(t => (
          {
            id: String(t.id),
            title: t.title,
            state: t.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
          }
        ));
        set(taskListBoxAtom, {
          tasks: tasks,
          error: false,
          loading: false,
        });
      } catch (e) {
        console.error("error--------------------------------------");
        set(taskListBoxAtom, {
          tasks: [],
          error: true,
          loading: false,
        });
      }
    }
  , []);

  return {
    fetchTasks
  }
};

const useUpdateState = () => {
  const updateState = useRecoilCallback(
    ({set}) => (taskListBox, taskId, newState) => {
      const index = taskListBox.tasks.findIndex(e => e.id === taskId)
      if (index >= 0) {
        const tasks = taskListBox.tasks;
        const newTasks = [
          ...tasks.slice(0, index),
          {
            ...tasks[index],
            state: newState,
          },
          ...tasks.slice(index + 1),
        ];
        set(taskListBoxAtom, {
          ...taskListBox,
          tasks: newTasks,
        });
      }
    }
  , []) ;

  return {
    updateState,
  }
}

const taskListBoxAtom = atom({
  key: "taskListBox",
  default: {
    tasks: [],
    loading: false,
  },
});

export const taskListBoxState = {
  useSetTaskListBox: () => useSetRecoilState(taskListBoxAtom),
  useTaskListBoxValue: () => useRecoilValue(taskListBoxAtom),
  useFetchTasks,
  useUpdateState,
}

