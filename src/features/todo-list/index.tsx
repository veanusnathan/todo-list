import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GroupedTodo } from "../home";

export enum LabelList {
  PERSONAL = "Personal",
  WORK = "Work",
  FINANCE = "Finance",
  OTHER = "Other",
}

export type ToDoItem = {
  id: string;
  body: string;
  label: string;
  isDone: boolean;
  group: string;
};

const ToDoList = () => {
  const { push } = useRouter();
  const query = useSearchParams().getAll("group");
  const [todoItem, setToDoItem] = useState<ToDoItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [editingId, setEditingId] = useState<string>("");
  const [todoInput, setTodoInput] = useState<string>("");

  const fetchTodos = () => {
    setToDoItem(JSON.parse(localStorage.getItem("todo-list") || "[]"));
  };

  const onNewToDos = (prevToDos: ToDoItem[]) => {
    const newToDos: ToDoItem = {
      id: (Math.random() * 100).toString(),
      body: "",
      label: "",
      isDone: false,
      group: title || "",
    };

    setToDoItem((prevTodos) => {
      setEditingId(newToDos.id);
      return [...prevTodos, newToDos];
    });
  };

  const onSaveTodos = (id: string) => {
    const dupTodos = [...todoItem];

    const editedIndex = dupTodos.findIndex((val) => val.id === id);

    dupTodos[editedIndex] = {
      ...dupTodos[editedIndex],
      body: todoInput,
      label: selectedLabel,
      group: title,
    };

    localStorage.setItem("todo-list", JSON.stringify(dupTodos));

    setEditingId("");
    setTodoInput("");

    fetchTodos();
  };

  const onCheckTodos = (id: string) => {
    const dupTodos = [...todoItem];

    const editedIndex = dupTodos.findIndex((val) => val.id === id);

    dupTodos[editedIndex] = {
      ...dupTodos[editedIndex],
      isDone: !dupTodos[editedIndex].isDone,
    };

    localStorage.setItem("todo-list", JSON.stringify(dupTodos));

    setEditingId("");
    setTodoInput("");

    fetchTodos();
  };

  function groupBy(array: ToDoItem[], keys: (keyof ToDoItem)[]): GroupedTodo[] {
    return array.reduce((result, currentItem) => {
      const groupKey = currentItem[keys[0]] as string;
      const labelKey = currentItem[keys[1]] as string;

      const existingGroup = result.find(
        (group) => group.group === groupKey && group.label === labelKey
      );

      if (existingGroup) {
        existingGroup.todos.push(currentItem);
      } else {
        result.push({ group: groupKey, label: labelKey, todos: [currentItem] });
      }

      return result;
    }, [] as GroupedTodo[]);
  }

  const groupedTodos = groupBy(todoItem, ["group", "label"]);
  const showedTodos: GroupedTodo[] = groupedTodos.filter((val) => {
    return val.group === query[0];
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <div className="pt-6 px-8 space-y-6 flex flex-col">
        <button onClick={() => push("/home")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-medium outline-none placeholder:text-black"
          placeholder="Title"
        />
        <div className="max-h-[500px]">
          <div className="h-full space-y-4 pb-4">
            {todoItem.map((val: ToDoItem) => {
              return (
                <div key={val.id} className="flex space-x-3">
                  <button onClick={() => onCheckTodos(val.id)}>
                    {val.isDone ? (
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="26"
                          height="26"
                          rx="7"
                          fill="black"
                          stroke="black"
                          strokeWidth="2"
                        />
                        <path
                          d="M21 9L12.0625 18L8 13.9091"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.18306 0C3.23754 0 0.849731 2.38781 0.849731 5.33333V18.6667C0.849731 21.6121 3.23754 24 6.18306 24H19.5165C22.4619 24 24.8498 21.6121 24.8498 18.6667V5.33333C24.8498 2.38781 22.4619 0 19.5165 0H6.18306ZM22.1831 5.33333C22.1831 3.86057 20.9891 2.66667 19.5165 2.66667H6.18306C4.7103 2.66667 3.5164 3.86057 3.5164 5.33333V18.6667C3.5164 20.1395 4.7103 21.3333 6.18306 21.3333H19.5165C20.9891 21.3333 22.1831 20.1395 22.1831 18.6667V5.33333Z"
                          fill="black"
                        />
                      </svg>
                    )}
                  </button>
                  {editingId === val.id ? (
                    <input
                      className="w-full outline-none text-[14px] font-light tracking-normal"
                      autoFocus
                      defaultValue={todoInput}
                      onChange={(e) => setTodoInput(e.target.value)}
                      onBlur={() => onSaveTodos(val.id)}
                      type="text"
                    />
                  ) : (
                    <div
                      className={`w-full font-light text-[14px] hover:bg-gray-300 ${
                        val.isDone ? "line-through" : ""
                      }`}
                      onClick={() => {
                        setEditingId(val.id);
                        setTodoInput(val.body);
                      }}
                    >
                      {val.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => onNewToDos(todoItem)}
            className="flex items-center space-x-3"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <rect width="28" height="28" rx="6" fill="white" />
              <path
                d="M14 4L14 24"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M23.9999 14.0024L3.99994 14.0024"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p className="bg-transparent opacity-30">To-do</p>
          </button>
        </div>
      </div>
      <div className="mx-4 border-t-2">
        <h3 className="text-[20px] py-6">Choose a label</h3>
        <div className="pb-[56px] space-x-3">
          {(Object.values(LabelList) as Array<LabelList>).map((val, idx) => {
            return (
              <button onClick={() => setSelectedLabel(val)} key={idx}>
                <p
                  className={`${
                    selectedLabel === val ? "bg-black" : "bg-[#919191]"
                  } text-white text-[12px] font-medium px-4 py-1.5 rounded-full`}
                >
                  {val}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
