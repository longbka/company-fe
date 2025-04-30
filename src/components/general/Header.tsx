import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

import { Phone, MapPin, Clock, Menu, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import { handleSignOut } from "@/lib/auth-action";
import Link from "next/link";
import LoginModal from "./Auth/Login";
import RegisterModal from "./Auth/Register";
import ResendEmailModal from "./Auth/ResendVerify";

export default async function Header() {
  const session = await auth();
  let user = null;
  if (session) {
    user = session.user;
  }
  return (
    <header className="w-full border-b">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="cursor-pointer flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="LotusTSE Logo"
            width={120}
            height={50}
          />
        </a>

        {/* Center Contact Info */}
        <div className="hidden lg:flex items-center space-x-10 text-sm">
          <div className="flex items-center space-x-2">
            <Phone className="w-6 h-6 text-blue-600" />
            <div className="flex flex-col">
              <span>+(84)24 376 333 66</span>
              <span>contact@lotustse.vn</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            <div className="flex flex-col">
              <span>Tầng 7, Tòa nhà hội nhà báo Việt Nam</span>
              <span>Lô E2-KĐT Cầu Giấy, Quận Cầu Giấy, HN</span>
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
      <div className="bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 font-semibold text-md w-full lg:justify-between">
            <a href="#" className="hover:underline">
              TRANG CHỦ
            </a>
            <a href="#" className="hover:underline">
              GIỚI THIỆU
            </a>
            <a href="#" className="hover:underline">
              SẢN PHẨM
            </a>
            <a href="#" className="hover:underline">
              DỊCH VỤ
            </a>
            <a href="#" className="hover:underline">
              DỰ ÁN
            </a>
            <Search className="w-5 h-5 cursor-pointer" />
          </nav>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="cursor-pointer" variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col space-y-4 mt-8 font-semibold text-lg px-4">
                  <a href="#">TRANG CHỦ</a>
                  <a href="#">GIỚI THIỆU</a>
                  <a href="#">SẢN PHẨM</a>
                  <a href="#">DỊCH VỤ</a>
                  <a href="#">DỰ ÁN</a>
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Tìm kiếm</span>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
