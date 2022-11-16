import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const taskListBoxAtom = atom({
  key: "taskListBox",
  defualt: {
    tasks: [],
    loading: false,
  },
});

export const taskListBoxState = {
  useSetTaskListBox: () => useSetRecoilState(taskListBoxAtom),
  useTaskListBoxValue: () => useRecoilValue(taskListBoxAtom),
}

