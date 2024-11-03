import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const notSelected =
    "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer";
  const selected =
    "shrink-0 rounded-t-lg border border-gray-700 border-b-gray-700 p-3 text-sm font-medium text-white cursor-pointer";

  return (
    <div>
      <div className="bg-black">
        {/* NAVIGATION BAR FOR SMALL DEVICES */}
        <div className="sm:hidden ">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>

          <select
            id="Tab"
            className="w-full rounded-md border-gray-700 text-center"
          >
            <option onClick={() => navigate("/")}>Landing</option>
            <option onClick={() => navigate("/analytics")}>Analytics</option>
            <option onClick={() => navigate("/info")}>Info</option>
          </select>
        </div>

        {/* NAVIGATION BAR FOR LARGER DEVICES */}
        <div className="hidden sm:block">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex gap-6">
              <a
                // When clicked it will navigate to the href and change its styling to the selected style.
                onClick={() => navigate("/")}
                className={location == "/" ? selected : notSelected}
              >
                Landing Page
              </a>

              <a
                onClick={() => navigate("/analytics")}
                className={location == "/analytics" ? selected : notSelected}
              >
                Analytics
              </a>

              <a
                onClick={() => navigate("/info")}
                className={location == "/comparison" ? selected : notSelected}
              >
                Info
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
