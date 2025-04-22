import React, { Fragment ,useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function OldMaster() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(
    (state) => state?.auth
  );

  console.log("OldMaster",isAuthenticated)

  return  isAuthenticated? (

    <Navigate to="/" />
  ) : (

      <Outlet />
  );


}