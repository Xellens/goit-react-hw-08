import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import s from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => dispatch(logout());

  return (
    <div className={s.wrapper}>
      <p className={s.greeting}>Welcome, {user.name}!</p>
      <button type="button" className={s.btn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
