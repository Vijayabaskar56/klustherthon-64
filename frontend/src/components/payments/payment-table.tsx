import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useAuthContext } from "../../context/useAuthContext";
import { formatCurrency } from "../../utils/formatter";
import { paymentType } from "../../utils/types";
import useFetchData from "../../hooks/useFetchData";
import useMutatePayments from "../../hooks/useMutatePayments";
import { DeleteBtn, UpdateBtn } from "../buttons";
import ErrorMessage from "../err-message";
import Loader from "../loader";
import EditPayment from "./edit-payment";

export default function PaymentTable() {
    const { fetchPayments } = useFetchData()
    const { data: payments, isLoading: isLoadingPayments, error: paymentsErrMsg } = fetchPayments()

    const [editModal, setEditModal] = useState<boolean>(false)
    const [selectedPayment, setSelectedPayment] = useState<paymentType | null>(null)

    const { user } = useAuthContext()
    const { deletePayment } = useMutatePayments()

    const [filteredPayments, setFilteredPayments] = useState<paymentType[]>(payments as paymentType[])

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query')

    const filterPayments = useDebouncedCallback(() => {
        if (query && payments) {
            setFilteredPayments(payments.filter((payment: paymentType) => payment.name.toLowerCase().includes(query.toLowerCase())))
        } else {
            setFilteredPayments(payments as paymentType[])
        }
    }, 500)

    useEffect(() => {
        filterPayments()
    }, [query])

    return (
        <div className="mt-6 flow-root w-full">
            <div className="inline-block min-w-full align-middle">
                {
                    isLoadingPayments &&
                    <div className="w-full flex items-center justify-center pt-20">
                        <Loader dark />
                    </div>
                }

                {!isLoadingPayments && paymentsErrMsg && <ErrorMessage>{paymentsErrMsg}</ErrorMessage>}

                {!isLoadingPayments && payments?.length === 0 && !paymentsErrMsg &&
                    <p className="w-full text-center mt-8">You have no payments available, create one</p>
                }

                {editModal &&
                    <EditPayment
                        payment={selectedPayment as paymentType}
                        setOpenEditModal={setEditModal}
                    />}

                {!!payments?.length && !isLoadingPayments &&
                    <div className="rounded-lg bg-background p-2 md:pt-0">
                        <div className="md:hidden">
                            {(query ? filteredPayments : payments).map((payment: paymentType) => (
                                <div
                                    key={payment._id}
                                    className="mb-2 w-full rounded-md bg-white p-4"
                                >
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{payment.name}</p>
                                            </div>
                                            <p className="text-sm text-text">{payment.notes}</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between pt-4">
                                        <p className="text-xl font-medium tex-text">
                                            {formatCurrency(payment.amount)}
                                        </p>
                                        <div className="flex justify-end gap-2">
                                            <div onClick={() => {
                                                setEditModal(true)
                                                setSelectedPayment(payment)
                                            }}>
                                                <UpdateBtn />
                                            </div>
                                            {user.isBusiness &&
                                                <div onClick={() => deletePayment(payment._id)}>
                                                    <DeleteBtn />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className="rounded-lg text-left text-sm font-normal">
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        About
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {(query ? filteredPayments : payments).map((payment: paymentType) => (
                                    <tr
                                        key={payment._id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{payment.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {payment.notes}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {formatCurrency(payment.amount)}
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex justify-end gap-3">
                                                <div onClick={() => {
                                                    setEditModal(true)
                                                    setSelectedPayment(payment)
                                                }}>
                                                    <UpdateBtn />
                                                </div>
                                                {user.isBusiness &&
                                                    <div onClick={() => deletePayment(payment._id)}>
                                                        <DeleteBtn />
                                                    </div>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}
