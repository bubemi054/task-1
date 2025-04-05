import cloud2Img from "../../assets/wmo-code-images/cloud2.png";

const Cloud = () => {
  return (
    <>
      <img
        className="z-index-[0] fixed top-[200px] left-[70px]"
        src={cloud2Img}
      />

      <img
        className="z-index-[0] fixed top-[200px] right-[150px] w-[218px]"
        src={cloud2Img}
      />

      <img
        className="z-index-[0] fixed right-[300px] bottom-[40px] w-[300px]"
        src={cloud2Img}
      />
    </>
  );
};

export default Cloud;
