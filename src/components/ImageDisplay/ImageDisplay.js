import React from "react";
import styles from "./ImageDisplay.module.css";

const ImageDisplay = (props) => {
  const [randomInt, setRandomInt] = React.useState(0);
  const [resultData, setResultData] = React.useState();

  //runs on mount only
  React.useEffect(() => {
    fetch(`https://www.reddit.com/r/Pomeranians.json`)
      .then((res) => res.json())
      .then((result) => {
        setResultData(result.data);
      });
  }, []);

  //when on focus mode calculate the random image before showing break mode
  React.useEffect(() => {
    if (props.mode === true) {
      setRandomInt(Math.floor(Math.random() * 25));
    }
  }, [props.mode]);

  const pomImage = (
    <>
      {resultData &&
      resultData.children[randomInt] &&
      resultData.children[randomInt].data &&
      resultData.children[randomInt].data.thumbnail ? (
        <img
          src={resultData.children[randomInt].data.thumbnail}
          alt={resultData.children[randomInt].data.title}
        />
      ) : null}
    </>
  );

  return props.mode ? (
    <div className={styles["image-container"]}>
      <div className={styles.image}></div>
      <div>Focus Time!</div>
    </div>
  ) : (
    <div className={styles["image-container"]}>
      <div>
        {pomImage === null ? <div className={styles.image}></div> : pomImage}
      </div>
      <div>Take A Break!</div>
    </div>
  );
};

export default ImageDisplay;
