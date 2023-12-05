'use client';

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshThunk } from "../redux/slices/index";
import { AppDispatch, RootState } from "../types/index";

export const useRefresh = () => {
  const callTime = useRef<number>(0);
  const loggedIn = useSelector((state: RootState) => state.admin.loggedIn);
  const refreshBaseTime = useSelector((state: RootState) => state.admin.refreshBaseTime);
  const dispatch = useDispatch<AppDispatch>();
  const timeToRefresh = 780000;

  const checkRefresh = () => {
    callTime.current += 60000;
    if (loggedIn && ((timeToRefresh + callTime.current) >= (timeToRefresh + timeToRefresh))) {
      dispatch(refreshThunk(timeToRefresh));
      callTime.current = 0;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkRefresh();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
}



