import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "/src/redux/filters/slice";
import { selectFilter } from "/src/redux/filters/selectors";
import s from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div className={s.searchBox}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        type="text"
        id="search"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
}
