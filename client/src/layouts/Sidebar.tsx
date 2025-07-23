import { NavLink } from "react-router-dom";
import sidebarItems from "../constants/sidebarItems";
import { useSidebar } from "../contexts/useSidebarContext";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const Sidebar = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const mainLinks = sidebarItems.slice(0, -1);
  const bottomLink = sidebarItems[sidebarItems.length - 1];

  return (
    <aside
      className={`${
        collapsed ? "w-[90px]" : "w-[300px]"
      } h-screen bg-gray-800 text-white px-4 py-5 shadow-md sticky top-0 left-0 flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        <div
          className={`flex items-center mb-8 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed ? (
            <h1 className="text-2xl font-bold text-emerald-300">Logo</h1>
          ) : null}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-emerald-300"
            title={collapsed ? "Open sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelRightClose /> : <PanelRightOpen />}
          </button>
        </div>

        <ul className="space-y-4">
          {mainLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-2 rounded-md text-gray-100 transition-all duration-300 ${
                      isActive ? "bg-emerald-600 " : "hover:bg-gray-700"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 " />
                  {!collapsed && <span className="text-md">{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4">
        <NavLink
          to={bottomLink.path}
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-2 rounded-md text-red-300 transition-colors ${
              isActive ? "bg-red-700" : "hover:bg-red-800"
            }`
          }
        >
          <bottomLink.icon className="w-5 h-5" />
          {!collapsed && <span className="text-md">{bottomLink.name}</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
