import { StateCreator, create } from "zustand";

export interface ToDos {
  id: string;
  task: string;
  isDone: boolean;
}

export interface GroupToDos {
  id: string;
  title: string;
  label: string;
  toDos: ToDos[];
}

interface ToDosSLice {
  allToDos: GroupToDos[];
  updateAllToDos: (allToDos: GroupToDos[]) => void;
}

const createToDosSlice: StateCreator<ToDosSLice, [], [], ToDosSLice> = (
  set
) => ({
  allToDos: [],
  updateAllToDos: (payload) => {
    set(() => ({ ...payload, allToDos: payload }));
  },
});

export type IToDosStore = ToDosSLice;

export const useToDosStore = create<IToDosStore>()((...a) => ({
  ...createToDosSlice(...a),
}));
