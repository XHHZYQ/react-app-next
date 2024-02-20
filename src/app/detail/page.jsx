
import style from "./detail.module.scss";

export default () => {
  return (
    <main className={style["detail-container"]}>
      <h1 className={style.title}>Page</h1>
      <div className={style.content}>
        <img src="imgs/教完再练.png" alt="" />
      </div>
    </main>
  );
};