import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";

import { Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import Image from "next/image";
import { handleSignOut } from "@/lib/auth-action";
import LoginModal from "./Auth/Login";
import RegisterModal from "./Auth/Register";
import ResendEmailModal from "./Auth/ResendVerify";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import Navbar from "./Navbar";
import { CompanyInfo } from "@/types/common";

export default async function Header() {
  const session = await auth();
  let user = null;
  if (session) {
    user = session.user;
  }

  const companyInfo = await sendRequest<IBackendRes<[CompanyInfo]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/company-info`,
    method: "GET",
  });
  return (
    <header className="w-full border-b">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="cursor-pointer flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="LotusTSE Logo"
            width={120}
            height={50}
          />
        </Link>

        {companyInfo?.data?.[0] && (
          <div className="hidden lg:flex items-center space-x-10 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-6 h-6 text-blue-600" />

              <div className="flex flex-col">
                <span>{companyInfo.data[0].phone}</span>
                <span>{companyInfo.data[0].email}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 max-w-md">
              <MapPin className="w-6 h-6 text-blue-600 " />
              <div className="flex flex-col">
                <span>{companyInfo.data[0].address}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-blue-600" />
              <div className="flex flex-col">
                <span>08:00 - 17:30 thứ 2 - thứ 6</span>
                <span>08:00 - 12:00 (thứ 7)</span>
              </div>
            </div>
          </div>
        )}
        {/* Right Language and Login */}
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 cursor-pointer"
              >
                <Image
                  src="/images/flags/uk.png"
                  alt="VN"
                  width={20}
                  height={14}
                />
                <ChevronDown className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/flags/vn.png"
                    alt="VN"
                    width={20}
                    height={14}
                  />
                  <span>Tiếng Việt</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/flags/uk.png"
                    alt="EN"
                    width={20}
                    height={14}
                  />
                  <span>English</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user ? (
            <div className="cursor-pointer">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{user.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-40">
                        <NavigationMenuLink>
                          <span onClick={handleSignOut}>Đăng xuất</span>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          ) : (
            <>
              <LoginModal />
              <RegisterModal />
              <ResendEmailModal />
            </>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </header>
  );
}
