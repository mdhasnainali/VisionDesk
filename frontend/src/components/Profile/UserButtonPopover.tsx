import { ModeToggle } from "../ui/ModeToggle";
import ManageAccount from "./ManageAccount";
import LogOut from "./LogOut";
import UserInfo from "./UserInfo";

const UserButtonPopover = ({ user }: { user: any }) => {
  return (
    <div className="flex  text-slate-800 dark:text-slate-200 flex-col">
      {/* User Info */}
      <UserInfo user={user} className="w-12 h-12" />
      {/* Manage Account */}
      <ManageAccount user={user} />
      <div className="border-b my-0.5"></div>
      {/* Dark Mode */}
      <ModeToggle />
      <div className="border-b my-0.5"></div>
      {/* Sign Out */}
      <LogOut />
    </div>
  );
};
export default UserButtonPopover;
