const LabelBadge = ({
  label,
  selectedLabel,
  onClick,
}: {
  label: string;
  selectedLabel: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <p
        className={`${
          selectedLabel === label ? "bg-black" : "bg-[#919191]"
        } text-white text-[12px] font-medium px-4 py-1.5 rounded-full`}
      >
        {label}
      </p>
    </button>
  );
};

export default LabelBadge;
