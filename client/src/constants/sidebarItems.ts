import { Home, ListTodo, Calendar, CheckCircle, LogOut } from "lucide-react";

type SidebarItem = {
  name: string;
  path: string;
  icon: typeof Home;
};

export const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Tasks", path: "/task", icon: ListTodo },
  { name: "Schedule", path: "/schedule", icon: Calendar },
  { name: "Completed", path: "/completed", icon: CheckCircle },
  { name: "Logout", path: "/logout", icon: LogOut },
];

export default sidebarItems;
