import { useState } from "react";
import { toast } from "sonner";
import { useAuthContext } from "../context/useAuthContext";
import { usersUrl } from "../utils/urls";
import useFetchData from "./useFetchData";

export default function useManageBusinessStaff() {
  const { user } = useAuthContext();
  const { fetchStaffs } = useFetchData();
  const { mutate } = fetchStaffs();

  const [loading, setLoading] = useState<boolean>(false);

  const verifyStaff = async (staffId: string, businessId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${usersUrl}/business/verify-staff`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          businessId,
          staffId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setLoading(false);
        mutate();
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const unVerifyStaff = async (staffId: string, businessId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${usersUrl}/business/unverify-staff`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          businessId,
          staffId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setLoading(false);
        mutate();
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return {
    verifyStaff,
    unVerifyStaff,
    loading,
  };
}
