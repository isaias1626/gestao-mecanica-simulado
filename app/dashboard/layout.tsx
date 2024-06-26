import HeaderPage from "@/components/menu";
import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
    return ( 
        <div>
            <HeaderPage />
            <main>{ children }</main>
        </div>
    );
}

export default Header;