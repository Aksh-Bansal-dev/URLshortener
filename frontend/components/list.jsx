import styles from "../styles/list.module.css";

function List(props) {
  const flag = props.flag;
  if (!flag) {
    return <></>;
  }
  return (
    <ul className={styles.container}>
      <li>
        Here's your short URL: &emsp;
        <a target="_blank" className={styles.url} href={props.url}>
          {props.url}
        </a>
      </li>
    </ul>
  );
}

export default List;
