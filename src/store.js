import { atom, useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";

const useFetchTasks = () => {
  const fetchTasks = useRecoilCallback(
    ({set}) => async () => {
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
            state: t.completed ? 'TASK_ARCHIVECD' : 'TASK_INBOX',
          }
        ));
        console.log(tasks);
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
}

