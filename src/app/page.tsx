import Navbar from "@/components/layout/Navbar";
import UserTable from "@/components/users/UserTable";
import ActivityLog from "@/components/activity/ActivityLog";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <div className="flex-1">
          <UserTable />
        </div>
        {/* <ActivityLog /> */}

      </div>
    </div>
  );
}
