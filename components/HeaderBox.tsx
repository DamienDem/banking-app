const HeaderBox = ({
  type = "title",
  title,
  subtext,
  userName,
}: HeaderPropsBox) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "welcome" && (
          <span className="text-bankGradient"> &nbsp; {userName}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
