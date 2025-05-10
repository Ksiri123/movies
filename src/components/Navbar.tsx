
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "My Bookings", path: "/my-bookings" },
  ];
  
  const closeSheet = () => setIsOpen(false);
  
  const renderNavLinks = () => {
    return navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={closeSheet}
        className={({ isActive }) =>
          `font-medium ${
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          }`
        }
      >
        {item.name}
      </NavLink>
    ));
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="text-xl font-bold">
          EventHub
        </NavLink>
        
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-6 pt-6">
                {renderNavLinks()}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-6">
            {renderNavLinks()}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
