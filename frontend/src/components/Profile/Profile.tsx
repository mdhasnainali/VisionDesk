"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Aavtar from "./Aavtar";
import UserButtonPopover from "./UserButtonPopover";

const Profile = () => {
  // const dispatch = useAppDispatch();
  // const isLogin = useAppSelector(selectIsLogin);
  // const refresh = useAppSelector(selectProfilRefresh);

  // useEffect(() => {
  //   GetProfile()
  //     .then((e) => {
  //       if (e) {
  //         dispatch(setGetProfile(e));
  //       } else {
  //         dispatch(setGetProfile(null));
  //       }
  //     })
  //     .catch(() => {
  //       dispatch(setGetProfile(null));
  //     });
  // }, [dispatch, refresh, isLogin]);

  // const user = useAppSelector(selectGetProfile);
  const user = {
    name: "VisionDesk AI",
    email: "visionDeskaI@gmail.com",
    phone_number: "1234567890",
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Aavtar className="w-8 h-8 " />
      </PopoverTrigger>
      <PopoverContent>
        {user && <UserButtonPopover user={user} />}
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
