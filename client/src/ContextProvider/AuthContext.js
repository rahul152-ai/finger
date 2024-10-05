import React, { useState } from "react";
import { AuthContext } from "../context/context";

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
