import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToDoItem } from "../todo-list";

export interface GroupedTodo {
  group: string;
  label: string;
  todos: ToDoItem[];
}

const Home = () => {
  const { push } = useRouter();
  const [todoItem, setToDoItem] = useState<ToDoItem[]>([]);

  const fetchTodos = () => {
    setToDoItem(JSON.parse(localStorage.getItem("todo-list") || "[]"));
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

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="pt-6">
      <div className="px-8">
        <svg
          width="94"
          height="28"
          viewBox="0 0 94 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M49.3068 21H44.598V6.45455H49.456C50.8812 6.45455 52.1051 6.74574 53.1278 7.32812C54.1506 7.90578 54.9342 8.73674 55.4787 9.82102C56.0279 10.9006 56.3026 12.1955 56.3026 13.706C56.3026 15.2211 56.0256 16.5232 55.4716 17.6122C54.9223 18.7012 54.1269 19.5393 53.0852 20.1264C52.0436 20.7088 50.7841 21 49.3068 21ZM46.7926 19.0824H49.1861C50.294 19.0824 51.215 18.8741 51.9489 18.4574C52.6828 18.036 53.232 17.4276 53.5966 16.6321C53.9612 15.8319 54.1435 14.8565 54.1435 13.706C54.1435 12.5649 53.9612 11.5966 53.5966 10.8011C53.2367 10.0057 52.6993 9.40199 51.9844 8.99006C51.2694 8.57812 50.3816 8.37216 49.321 8.37216H46.7926V19.0824ZM63.4563 21.2202C62.4336 21.2202 61.5411 20.9858 60.7788 20.517C60.0165 20.0483 59.4246 19.3925 59.0032 18.5497C58.5818 17.7069 58.3711 16.7221 58.3711 15.5952C58.3711 14.4635 58.5818 13.474 59.0032 12.6264C59.4246 11.7789 60.0165 11.1207 60.7788 10.652C61.5411 10.1832 62.4336 9.94886 63.4563 9.94886C64.479 9.94886 65.3716 10.1832 66.1339 10.652C66.8962 11.1207 67.488 11.7789 67.9094 12.6264C68.3308 13.474 68.5415 14.4635 68.5415 15.5952C68.5415 16.7221 68.3308 17.7069 67.9094 18.5497C67.488 19.3925 66.8962 20.0483 66.1339 20.517C65.3716 20.9858 64.479 21.2202 63.4563 21.2202ZM63.4634 19.4375C64.1263 19.4375 64.6755 19.2623 65.1112 18.9119C65.5468 18.5616 65.8687 18.0952 66.0771 17.5128C66.2901 16.9304 66.3967 16.2888 66.3967 15.5881C66.3967 14.892 66.2901 14.2528 66.0771 13.6705C65.8687 13.0833 65.5468 12.6122 65.1112 12.2571C64.6755 11.902 64.1263 11.7244 63.4634 11.7244C62.7958 11.7244 62.2418 11.902 61.8015 12.2571C61.3659 12.6122 61.0415 13.0833 60.8285 13.6705C60.6201 14.2528 60.516 14.892 60.516 15.5881C60.516 16.2888 60.6201 16.9304 60.8285 17.5128C61.0415 18.0952 61.3659 18.5616 61.8015 18.9119C62.2418 19.2623 62.7958 19.4375 63.4634 19.4375ZM75.5071 21.2202C74.4844 21.2202 73.5919 20.9858 72.8295 20.517C72.0672 20.0483 71.4754 19.3925 71.054 18.5497C70.6326 17.7069 70.4219 16.7221 70.4219 15.5952C70.4219 14.4635 70.6326 13.474 71.054 12.6264C71.4754 11.7789 72.0672 11.1207 72.8295 10.652C73.5919 10.1832 74.4844 9.94886 75.5071 9.94886C76.5298 9.94886 77.4223 10.1832 78.1847 10.652C78.947 11.1207 79.5388 11.7789 79.9602 12.6264C80.3816 13.474 80.5923 14.4635 80.5923 15.5952C80.5923 16.7221 80.3816 17.7069 79.9602 18.5497C79.5388 19.3925 78.947 20.0483 78.1847 20.517C77.4223 20.9858 76.5298 21.2202 75.5071 21.2202ZM75.5142 19.4375C76.1771 19.4375 76.7263 19.2623 77.1619 18.9119C77.5975 18.5616 77.9195 18.0952 78.1278 17.5128C78.3409 16.9304 78.4474 16.2888 78.4474 15.5881C78.4474 14.892 78.3409 14.2528 78.1278 13.6705C77.9195 13.0833 77.5975 12.6122 77.1619 12.2571C76.7263 11.902 76.1771 11.7244 75.5142 11.7244C74.8466 11.7244 74.2926 11.902 73.8523 12.2571C73.4167 12.6122 73.0923 13.0833 72.8793 13.6705C72.6709 14.2528 72.5668 14.892 72.5668 15.5881C72.5668 16.2888 72.6709 16.9304 72.8793 17.5128C73.0923 18.0952 73.4167 18.5616 73.8523 18.9119C74.2926 19.2623 74.8466 19.4375 75.5142 19.4375ZM82.9627 21V10.0909H85.0863V21H82.9627ZM84.0352 8.40767C83.6658 8.40767 83.3486 8.28456 83.0835 8.03835C82.823 7.7874 82.6928 7.48911 82.6928 7.14347C82.6928 6.79309 82.823 6.49479 83.0835 6.24858C83.3486 5.99763 83.6658 5.87216 84.0352 5.87216C84.4045 5.87216 84.7193 5.99763 84.9798 6.24858C85.2449 6.49479 85.3775 6.79309 85.3775 7.14347C85.3775 7.48911 85.2449 7.7874 84.9798 8.03835C84.7193 8.28456 84.4045 8.40767 84.0352 8.40767ZM93.0355 10.0909V11.7955H87.0767V10.0909H93.0355ZM88.6747 7.47727H90.7983V17.7969C90.7983 18.2088 90.8598 18.5189 90.983 18.7273C91.1061 18.9309 91.2647 19.0705 91.4588 19.1463C91.6577 19.2173 91.8731 19.2528 92.1051 19.2528C92.2756 19.2528 92.4247 19.241 92.5526 19.2173C92.6804 19.1937 92.7798 19.1747 92.8509 19.1605L93.2344 20.9148C93.1113 20.9621 92.9361 21.0095 92.7088 21.0568C92.4815 21.1089 92.1974 21.1373 91.8565 21.142C91.2978 21.1515 90.777 21.0521 90.294 20.8438C89.8111 20.6354 89.4205 20.3134 89.1222 19.8778C88.8239 19.4422 88.6747 18.8954 88.6747 18.2372V7.47727Z"
            fill="black"
          />
          <rect
            x="0.425342"
            y="1.42534"
            width="26.3712"
            height="25.5205"
            rx="4.11164"
            fill="white"
            stroke="black"
            stroke-width="0.850685"
          />
          <path
            d="M12.9137 7.34604L18.6059 13.9168L31.6168 2.41797"
            stroke="black"
            stroke-width="3.33229"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {groupedTodos.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            className="pt-[280px]"
            src="/assets/Home.png"
            height={227}
            width={430}
            alt="home-icon"
          />
          <div className="flex flex-col w-full justify-center items-center pt-[50px]">
            <p className="text-[20px] pb-8 font-light">
              Create your first to-do list...
            </p>
            <button
              onClick={() => push("/todo-list")}
              className="flex items-center space-x-2 bg-black px-6 py-[14px] rounded-full text-white"
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
        <>
          <div className="pt-[33px] mx-4 flex flex-col space-y-[18px]">
            {groupedTodos.map((val, idx) => {
              return (
                <button
                  className={`space-y-[14px] ${
                    val.label === "Finance"
                      ? "bg-[#F3E4F6]"
                      : val.label === "Other"
                      ? "bg-[#E5FFE6]"
                      : val.label === "Personal"
                      ? "bg-[#FFF6E7]"
                      : "bg-[#1919]"
                  } rounded-[16px] p-4`}
                  onClick={() => push(`/todo-list?group=${val.group}`)}
                  key={idx}
                >
                  <p className="flex justify-start text-xl">{val.group}</p>
                  <p className="flex justify-start bg-black text-white text-[10px] font-medium px-[7px] py-[3px] rounded-full w-fit">
                    {val.label}
                  </p>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => push("/todo-list")}
            className="absolute bottom-8 right-8"
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
        </>
      )}
    </div>
  );
};

export default Home;
