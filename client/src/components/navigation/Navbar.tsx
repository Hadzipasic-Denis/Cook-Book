import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 flex justify-between items-center md:hidden">
      <div>
        <img src={logo} alt="logo" width={58} />
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 text-gray-900 font-semibold focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
            <>
              <li>
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recipes"
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                >
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inspiration"
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                >
                  Get Inspired
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plan"
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                >
                  My Weekly Plan
                </NavLink>
              </li>
            </>
          </ul>
        )}
      </div>
    </nav>
  );
}
