import Sidebar from "../navigation/Sidebar";

export default function Home() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full bg-slate-50">
      <p>Home</p>

      </div>
    </div>
  );
}
