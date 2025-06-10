import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

const Navigation = () => {
//   const currentUser = useSelector(selectCurrentUser);
  //  console.log(currentUser)
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(
    (state) => state?.auth
  );
  console.log("isAuthenticated",isAuthenticated)
  return true ? (

      <Outlet />

  ) : (
   

    <Navigate to="/login" />
  );
};

export default Navigation;

