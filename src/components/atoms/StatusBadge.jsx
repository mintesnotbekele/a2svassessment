export const StatusBadge = ({ isOpen }) => {
  return (
    <div
      className="w-fit px-4 py-1 font-primary rounded-full font-bold"
      style={{
        backgroundColor: isOpen ? "#79B93C33" : "#F1722833",
        color: isOpen ? "#79B93C" : "#F17228",
        
        fontSize: "22px",
        lineHeight: "120%",
        letterSpacing: "0%",
      }}
    >
      {isOpen ? "Open" : "Closed"}
    </div>
  );
};


