import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type AavtarProps = {
  className?: string;
};

const Aavtar: React.FC<AavtarProps> = ({ className }) => {
  return (
    <Avatar className={`${className}  hover:animate-pulse`}>
      <AvatarImage src="/avatar.jpg"/>
      <AvatarFallback>P</AvatarFallback>
    </Avatar>
  );
};

export default Aavtar;
