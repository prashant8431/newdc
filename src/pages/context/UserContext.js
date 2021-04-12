import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [mycompany, setMyCompany] = useState([]);

  useEffect(() => {
    const getStored = localStorage.getItem("mycompany");
    setMyCompany(JSON.parse(getStored));

    // console.log(mycompany);
  }, []);
  return (
    <UserContext.Provider value={{ mycompany }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
