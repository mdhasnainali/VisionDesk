import Aavtar from "./Aavtar";
type UserInfoProps = {
  className?: string;
  user: {
    name: string;
    email: string;
  };
};
const UserInfo: React.FC<UserInfoProps> = ({ className, user }) => {
  return (
    <div className="flex px-4 py-2 items-center gap-3 border-b pb-3 ">
      <Aavtar className={className} />
      <div>
        <p className="text-sm font-semibold ">{user?.name || "VisionDesk AI"}</p>
        <p className="text-xs dark:text-slate-300">{user.email || "visionDeskaI@gmail.com"}</p>
      </div>
    </div>
  );
};

export default UserInfo;
