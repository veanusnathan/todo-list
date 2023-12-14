import Image from "next/image";
import { useRouter } from "next/navigation";
import { GroupToDos, useToDosStore } from "@/stores";
import { uuid } from "uuidv4";
import ToDoCard from "./todoCard";
import { useEffect } from "react";

const Home = () => {
  const { push } = useRouter();
  const { allToDos, updateAllToDos } = useToDosStore();

  function filterCompletedToDosAndGroups(groups: GroupToDos[]) {
    if (groups) {
      const newTodos = groups.filter((val) => {
        return val.toDos.length !== 0;
      });
      newTodos.forEach((val, idx) => {
        const numberOfTask = val.toDos.length;
        let numberOfTaskDone = 0;
        for (let i = 0; i <= numberOfTask; i++) {
          if (val.toDos[i]?.isDone === true) {
            numberOfTaskDone += 1;
          }
        }
        if (numberOfTask === numberOfTaskDone) {
          newTodos.splice(idx, 1);
        }
      });
      return updateAllToDos(newTodos);
    } else {
      return;
    }
  }

  useEffect(() => {
    filterCompletedToDosAndGroups(allToDos);
  }, []);

  return (
    <div className="h-[100vh] relative">
      {allToDos?.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Image
            className="280:mt-[200px] 375:mt-[220px] 430:mt-[270px] 768:mt-[300px] 1024:mt-[200px] 1280:mt-[300px]"
            src="/assets/Home.png"
            height={227}
            width={430}
            alt="home-icon"
          />
          <div className="flex flex-col justify-center items-center 375:mt-[40px] 430:mt-[50px]">
            <p className="text-base font-light">
              Create your first to-do list...
            </p>
            <button
              onClick={() => push(`/todo-list?id=${uuid()}`)}
              className="flex bg-black text-white px-[24px] py-[14px] rounded-[30px] w-fit mt-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              <p className="text-[14px] font-light">New List</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-[80px] 280:mx-2 375:mx-3 430:mx-4 768:mx-10 1024:mx-20">
          <div className="space-y-[18px] 1024:grid 1024:grid-cols-4 1024:gap-4 1024:space-y-0">
            {allToDos?.map((val, idx) => {
              return (
                <ToDoCard
                  key={idx}
                  id={val.id}
                  title={val.title}
                  label={val.label}
                />
              );
            })}
          </div>
          <button
            onClick={() => push(`/todo-list?id=${uuid()}`)}
            className="absolute z-10 bottom-8 right-8 375:bottom-3 375:right-3 768:right-8 768:bottom-8 280:right-2 280:bottom-2 430:bottom-8 430:right-8"
          >
            <svg
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group 55">
                <path
                  id="Subtract"
                  d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                  fill="black"
                />
                <g id="Group 54">
                  <path
                    id="Line 48"
                    d="M33 22V42"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    id="Line 49"
                    d="M42.9999 32.0024L22.9999 32.0024"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
