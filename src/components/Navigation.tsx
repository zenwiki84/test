
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavigationHeader from "./NavigationHeader";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Calendar as CalendarIcon,
  CheckSquare,
  GraduationCap,
  Home,
  LucideIcon,
  ShieldCheck,
  UserCircle2,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

interface NavItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon: Icon, isActive }) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start transition-all duration-300",
          isActive 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "hover:bg-muted hover:text-primary"
        )}
      >
        <Icon className={cn("mr-2 h-5 w-5", isActive ? "animate-pulse" : "")} />
        {label}
      </Button>
    </Link>
  );
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const { userRole } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const commonNavItems = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/calendar", label: "Calendar", icon: CalendarIcon },
    { to: "/todo", label: "Tasks", icon: CheckSquare },
    { to: "/profile", label: "Profile", icon: UserCircle2 },
  ];

  const roleBasedNavItems = {
    student: [
      { to: "/course/1", label: "My Courses", icon: GraduationCap },
    ],
    teacher: [
      { to: "/course/1", label: "My Courses", icon: GraduationCap },
      { to: "/reports", label: "Reports", icon: BarChart3 },
      { to: "/admin", label: "Admin Panel", icon: ShieldCheck },
    ],
    admin: [
      { to: "/reports", label: "Reports", icon: BarChart3 },
      { to: "/admin", label: "Admin Panel", icon: ShieldCheck },
    ],
  };

  const getNavItems = () => {
    if (!userRole) return commonNavItems;

    return [
      ...commonNavItems,
      ...(roleBasedNavItems[userRole] || []),
    ];
  };

  const navItems = getNavItems();

  return (
    <>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar navigation */}
        <aside
          className={cn(
            "border-r bg-background transition-all duration-300 ease-in-out",
            isSidebarOpen ? "w-64" : "w-0 -translate-x-full md:w-16 md:translate-x-0"
          )}
        >
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex-1 space-y-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  isActive={location.pathname === item.to}
                />
              ))}
            </div>
            
            <div className="p-4 bg-muted/40 rounded-lg space-y-2 animate-fade-in">
              <h3 className="text-sm font-medium">ASBM University</h3>
              <p className="text-xs text-muted-foreground">Bhubaneswar Campus</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <BadgeCheck className="h-4 w-4 mr-1 text-primary" />
                Summer Term 2023
              </div>
            </div>
          </div>
        </aside>
        
        {/* Mobile backdrop for sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-10 bg-black/50 md:hidden" 
            onClick={toggleSidebar}
          />
        )}
      </div>
    </>
  );
};

export default Navigation;
