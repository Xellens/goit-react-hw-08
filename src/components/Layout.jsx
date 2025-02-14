import { Outlet } from "react-router-dom";
import AppBar from "/src/components/AppBar/AppBar";

export default function Layout() {
  return (
    <>
      <AppBar />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}
