import { useRouter } from "next/navigation";

const ToDoCard = ({
  id,
  title,
  label,
}: {
  id: string;
  title: string;
  label: string;
}) => {
  const { push } = useRouter();
  return (
    <button
      className={`${
        label === "Finance"
          ? "bg-[#F3E4F6]"
          : label === "Other"
          ? "bg-[#E5FFE6]"
          : label === "Personal"
          ? "bg-[#FFF6E7]"
          : "bg-[#1919]"
      } p-4 w-full rounded-[16px] flex flex-col justify-start`}
      onClick={() => push(`/todo-list?id=${id}`)}
    >
      <p className="1024:text-2xl 375:text-lg 768:text-xl line-clamp-1">
        {title || "New ToDos"}
      </p>
      <p className="mt-[14px] py-[3px] px-[7px] rounded-full text-white bg-black 375:text-xs">
        {label || "No Label"}
      </p>
    </button>
  );
};

export default ToDoCard;
