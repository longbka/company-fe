"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Project, Service } from "@/types/common";
import { sendRequest } from "@/utils/api";

interface SubItem {
  title: string;
  href?: string;
  subItems?: SubItem[];
}

interface MenuItem {
  title: string;
  subItems: SubItem[];
}

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[] | undefined>();

  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
    if (openMenu !== title) setOpenSubMenu(null);
  };

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };
  useEffect(() => {
    const fetchData = async () => {
      const projects = await sendRequest<IBackendRes<Project[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects`,
        method: "GET",
      });
      const services = await sendRequest<IBackendRes<Service[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/offerings`,
        method: "GET",
      });
      if (projects?.data && services?.data) {
        setMenuItems([
          {
            title: "GIỚI THIỆU",
            subItems: [
              {
                title: "Về chúng tôi",
                href: "/about/description",
              },
              {
                title: "Bộ máy công ty",
                href: "/about/organization",
              },
            ],
          },
          {
            title: "SẢN PHẨM",
            subItems: [
              {
                title: "Sản phẩm A",
                subItems: [
                  { title: "Phiên bản 1", href: "/san-pham/a/v1" },
                  { title: "Phiên bản 2", href: "/san-pham/a/v2" },
                ],
              },
              {
                title: "Sản phẩm B",
                subItems: [
                  { title: "Phiên bản 1", href: "/san-pham/b/v1" },
                  { title: "Phiên bản 2", href: "/san-pham/b/v2" },
                ],
              },
            ],
          },
          {
            title: "DỊCH VỤ",
            subItems: services?.data.map((service) => ({
              title: service.title,
              href: service?.slug,
              subItems: service.subOfferings.length
                ? service.subOfferings.map((subService) => ({
                    title: subService.title,
                    href: "/service/" + service.slug + "/" + subService.slug
                  }))
                : [],
            })),
          },
          {
            title: "DỰ ÁN",
            subItems: projects?.data.map((project) => {
              return { title: project.title, href: "/project/" + project.slug };
            }),
          },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    menuItems && (
      <nav className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex items-center justify-center space-x-4 w-full">
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-8">
                  <NavigationMenuItem className="p-0">
                    <NavigationMenuLink
                      className={cn(
                        "bg-transparent text-white hover:bg-transparent hover:text-gray-400 font-bold rounded-none cursor-pointer text-md"
                      )}
                      href="/"
                    >
                      TRANG CHỦ
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {menuItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={cn(
                            "bg-transparent text-white hover:bg-transparent hover:text-gray-400 font-bold rounded-none cursor-pointer text-md flex items-center"
                          )}
                        >
                          <span>{item.title} </span>
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-blue-600 mt-4 rounded-none">
                          {item.subItems.map((subItem, subIndex) =>
                            subItem.subItems && subItem.subItems.length > 0 ? (
                              <DropdownMenuSub key={subIndex}>
                                <DropdownMenuSubTrigger className="text-white text-[16px] cursor-pointer px-8 font-bold">
                                  {subItem.title}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className="bg-blue-600 mt-4 rounded-none ml-1 cursor-pointer font-bold">
                                  {subItem.subItems.map(
                                    (subSubItem, subSubIndex) => (
                                      <DropdownMenuItem
                                        key={subSubIndex}
                                        asChild
                                        className="px-8"
                                      >
                                        <Link
                                          href={subSubItem.href!}
                                          className="w-full text-white text-[16px] cursor-pointer font-bold"
                                        >
                                          {subSubItem.title}
                                        </Link>
                                      </DropdownMenuItem>
                                    )
                                  )}
                                </DropdownMenuSubContent>
                              </DropdownMenuSub>
                            ) : (
                              <DropdownMenuItem
                                key={subIndex}
                                asChild
                                className="px-8"
                              >
                                <Link
                                  href={subItem.href!}
                                  className="w-full text-white text-[16px] cursor-pointer font-bold"
                                >
                                  {subItem.title}
                                </Link>
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="md:hidden flex items-center">
              <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-blue-600">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500"
              >
                TRANG CHỦ
              </Link>

              {menuItems.map((item, index) => (
                <div key={index}>
                  <div
                    className="flex justify-between items-center px-3 py-2 rounded-none text-base font-medium text-white hover:bg-blue-500 cursor-pointer"
                    onClick={() => toggleMenu(item.title)}
                  >
                    <span>{item.title}</span>
                    {item.subItems &&
                      item.subItems.length > 0 &&
                      (openMenu === item.title ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                  {item.subItems &&
                    item.subItems.length > 0 &&
                    openMenu === item.title && (
                      <div className="pl-6 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            <div
                              className="flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500 cursor-pointer"
                              onClick={() => toggleSubMenu(subItem.title)}
                            >
                              <Link href={subItem.href!}>{subItem.title}</Link>
                              {subItem.subItems &&
                                subItem.subItems.length > 0 &&
                                (openSubMenu === subItem.title ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                ))}
                            </div>
                            {subItem.subItems &&
                              subItem.subItems.length > 0 &&
                              openSubMenu === subItem.title && (
                                <div className="pl-6 space-y-1">
                                  {subItem.subItems.map(
                                    (subSubItem, subSubIndex) => (
                                      <Link
                                        key={subSubIndex}
                                        href={subSubItem.href!}
                                        className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500"
                                      >
                                        {subSubItem.title}
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    )
  );
};

export default NavigationBar;
