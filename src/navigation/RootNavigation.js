import React from "react";
import AdminStack from "./AdminStack";
import UserStack from "./UserStack";
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <AdminStack /> : <UserStack />;
}
