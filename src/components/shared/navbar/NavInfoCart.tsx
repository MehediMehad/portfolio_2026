import Image from "next/image";
import Link from "next/link";
import profile from "@/assets/images/MehediHasan.png";

const NavInfoCart = async () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10">
        <Image
          src={profile}
          alt="Md Mehedi Hasan"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
      <div className="hidden sm:flex flex-col leading-none">
        <span className="text-sm font-semibold text-foreground">
          Md Mehedi Hasan
        </span>
        <span className="text-xs text-muted-foreground">
          FULL STACK DEVELOPER
        </span>
      </div>
    </Link>
  );
};

export default NavInfoCart;
