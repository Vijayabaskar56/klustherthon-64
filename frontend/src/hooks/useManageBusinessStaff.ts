import { useState } from "react";
import { usersUrl } from "../utils/urls";
import { useAuthContext } from "../context/useAuthContext";
import { toast } from "sonner";
import { businessStaffType } from "../utils/types";
import { useDataContext } from "../context/useFetchDataContext";

export default function useManageBusinessStaff() {
  const { user } = useAuthContext();
  const { fetchStaffs } = useDataContext();

  const [loading, setLoading] = useState<boolean>(false);

  const verifyStaff = async (staffId: string, businessId: string) => {
    setLoading(true);
    try {
      //   const response = await fetch(`${usersUrl}/business/verify-staff`, {
      const response = await fetch(
        `http://localhost:5000/api/users/business/verify-staff`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            businessId,
            staffId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchStaffs();
        setLoading(false);
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
        fetchStaffs();
        setLoading(false);
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
