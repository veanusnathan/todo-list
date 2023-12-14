import { ToDos, useToDosStore } from "@/stores";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import LabelBadge from "./labelBadge";

export enum LabelList {
  PERSONAL = "Personal",
  WORK = "Work",
  FINANCE = "Finance",
  OTHER = "Other",
}

const ToDoList = ({
  title,
  label,
}: {
  id: string;
  title: string;
  label: string;
}) => {
  const { push } = useRouter();
  const groupId = useSearchParams().get("id");
  const { allToDos, updateAllToDos } = useToDosStore();
  const [editedTitle, setEditedTitle] = useState(title);
  const [selectedLabel, setSelectedLabel] = useState(label);
  const [editingId, setEditingId] = useState<string>("");
  const [todoInput, setTodoInput] = useState<string>("");
  const [todoItem, setTodoItem] = useState<ToDos[]>([]);

  const handleTitleChange = (id: string, val: string) => {
    const newAllToDos = [...allToDos];

    const editedIndex = newAllToDos.findIndex((val) => val.id === id);
    newAllToDos[editedIndex] = {
      ...newAllToDos[editedIndex],
      title: val,
    };

    setEditedTitle(val);
    updateAllToDos(newAllToDos);
  };

  const handleLabelChange = (id: string, val: string) => {
    const newAllToDos = [...allToDos];

    const editedIndex = newAllToDos.findIndex((val) => val.id === id);
    newAllToDos[editedIndex] = {
      ...newAllToDos[editedIndex],
      label: val,
    };

    setSelectedLabel(val);
    updateAllToDos(newAllToDos);
  };

  const handleToDosChange = (groudId: string, toDosId: string) => {
    const newGroupAllToDos = [...allToDos];

    const editedGroupIndex = newGroupAllToDos.findIndex(
      (val) => val.id === groudId
    );
    const editedToDosIndex = newGroupAllToDos[editedGroupIndex].toDos.findIndex(
      (val) => val.id === toDosId
    );
    const newToDos = [...allToDos[editedGroupIndex].toDos];
    newGroupAllToDos[editedGroupIndex].toDos[editedToDosIndex] = {
      ...newToDos[editedToDosIndex],
      task: todoInput,
    };

    updateAllToDos(newGroupAllToDos);
    setEditingId("");
    setTodoInput("");
  };

  const handleToDosCheckChange = (groudId: string, toDosId: string) => {
    const newGroupAllToDos = [...allToDos];

    const editedGroupIndex = newGroupAllToDos.findIndex(
      (val) => val.id === groudId
    );
    const editedToDosIndex = newGroupAllToDos[editedGroupIndex].toDos.findIndex(
      (val) => val.id === toDosId
    );
    const newToDos = [...allToDos[editedGroupIndex].toDos];
    newGroupAllToDos[editedGroupIndex].toDos[editedToDosIndex] = {
      ...newToDos[editedToDosIndex],
      isDone:
        !newGroupAllToDos[editedGroupIndex].toDos[editedToDosIndex].isDone,
    };

    updateAllToDos(newGroupAllToDos);
    setEditingId("");
    setTodoInput("");
  };

  const onNewToDos = () => {
    const newToDos = [...allToDos];
    const selectedTodos = newToDos.findIndex((val) => {
      return val.id === groupId;
    });
    console.log(selectedTodos);
    const id = uuid();
    newToDos[selectedTodos].toDos.push({
      id,
      task: "",
      isDone: false,
    });

    setEditingId(id);
    updateAllToDos(newToDos);
  };

  useEffect(() => {
    const selectedToDos = allToDos.filter((val) => {
      return val.id === groupId;
    });
    if (selectedToDos.length !== 0) {
      setEditedTitle(selectedToDos[0].title);
      setSelectedLabel(selectedToDos[0].label);
      setTodoItem(selectedToDos[0]?.toDos);
    } else {
      const newGroupTodos = [...allToDos];
      newGroupTodos.push({
        id: groupId || "",
        title: "",
        label: "",
        toDos: [],
      });
      updateAllToDos(newGroupTodos);
    }
  }, [allToDos, groupId]);

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <div className="flex flex-col">
        <button onClick={() => push("/home")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 280:mt-5 280:ml-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <input
          className="280:ml-5 280:mt-5 text-2xl font-medium outline-none placeholder:text-black"
          placeholder="Title"
          onBlur={(e) => handleTitleChange(groupId || "", e.target.value)}
          defaultValue={editedTitle}
        />
        <div className="max-h-[500px]">
          {todoItem?.length === 0 ? null : (
            <div className="space-y-4">
              {todoItem?.map((val: ToDos) => {
                return (
                  <div
                    key={val.id}
                    className="280:ml-5 280:mt-5 flex items-center space-x-3 mr-2"
                  >
                    <button
                      onClick={() =>
                        handleToDosCheckChange(groupId || "", val.id)
                      }
                    >
                      {val.isDone ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          className="280:h-5 430:h-6"
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
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="280:h-5 430:h-6"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="26"
                            height="26"
                            rx="7"
                            stroke="black"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </button>
                    {editingId === val.id ? (
                      <input
                        className={`w-full outline-none 280:text-sm 430:text-base font-light tracking-normal`}
                        autoFocus
                        defaultValue={val.task}
                        onChange={(e) => setTodoInput(e.target.value)}
                        onBlur={() => handleToDosChange(groupId || "", val.id)}
                        type="text"
                      />
                    ) : (
                      <div
                        className={`w-full font-light 280:text-sm 430:text-base tracking-normal hover:bg-gray-100 ${
                          val.task ? "text-black" : "text-gray-300"
                        }
                        } ${val.isDone ? "line-through" : ""}`}
                        onClick={() => {
                          setEditingId(val.id);
                          setTodoInput(val.task);
                        }}
                      >
                        {val.task || "New task"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <button
            onClick={() => onNewToDos()}
            className="280:mt-5 280:ml-5 flex items-center space-x-3"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="280:h-5"
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
            <p className="280:text-sm bg-transparent opacity-30">To-do</p>
          </button>
        </div>
      </div>
      <div className="280:mx-2 280:mb-5 430:mx-4 border-t-2">
        <h3 className="text-[20px] 280:mb-4 430:my-6">Choose a label</h3>
        <div className="280:grid 280:grid-cols-3 280:gap-3 430:flex 430:pb-14">
          {(Object.values(LabelList) as Array<LabelList>).map((val, idx) => {
            return (
              <LabelBadge
                key={idx}
                onClick={() => handleLabelChange(groupId || "", val)}
                label={val}
                selectedLabel={selectedLabel}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
