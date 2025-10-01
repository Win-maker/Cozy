import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import cozy from "@/assets/HeaderLayout/Cozy®.svg";
import search from "@/assets/HeaderLayout/search.svg";
import shoppingCard from "@/assets/HeaderLayout/shopping-cart.svg";
import menu from "@/assets/HeaderLayout/menu.svg";
import { useAppSelector } from "@/store";
import { selectCartCount } from "@/store/features/Card/cardSlice";

const navLinks = [
  { name: "Shop", path: "/" },
  { name: "Collective", path: "/collective" },
  { name: "Designers", path: "/designers" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const HeaderLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();


  const cartCount = useAppSelector(selectCartCount);
    
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="relative h-16 flex justify-between items-center pl-4 border-b border-[rgba(209,209,216,1)]
     text-text-primary">
      <Link to="/">
        <img src={cozy} className="w-24 sm:w-auto" alt="logo" />
      </Link>

      <nav className="hidden md:flex gap-10 text-sm font-semibold font-secondary">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
     
           
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div
        className="flex items-center space-x-4
             absolute right-0 top-0 h-16 pr-4 md:static md:pr-0"
      >
        <div
          className="cursor-pointer  md:pointer-events-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FiX className="w-4 h-4" />
          ) : (
            <img src={menu} className="w-4 h-4" />
          )}
        </div>

        <img src={search} alt="search" className="w-5 h-5" />
<div className="w-12 sm:w-20 pl-2.5 md:pl-0 border-l border-[rgba(209,209,216,1)] flex items-center justify-center h-16">
  <div className="relative cursor-pointer"
  onClick={() => navigate("/")}>
    <img src={shoppingCard} alt="shoppingCart" className="w-5 h-5" />
    
    {cartCount > 0 && (
      <span
        className="absolute -top-2 -right-2 text-white text-xs font-semibold w-3.5 h-3.5 flex items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(58, 163, 159, 1)" }}
      >
        <span className="text-sm text-[8px]">{cartCount}</span>
      </span>
    )}
  </div>
</div>


      </div>

      <div className="md:hidden">
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col z-50">
            <div className="flex flex-col px-4 pb-4 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-teal-600 text-lg font-semibold"
                      : "text-text-primary text-lg font-semibold hover:text-teal-600"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderLayout;
