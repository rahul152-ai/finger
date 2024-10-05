import { createContext } from "react";

const ThemeContext = createContext("light");
const AuthContext = createContext(null);

export { ThemeContext, AuthContext };
