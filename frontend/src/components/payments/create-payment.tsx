import React, { useReducer, useState } from "react"

import { MdCancel } from "react-icons/md";
import { toast } from "sonner";

const initialState = {
    name: '',
    description: '',
    amount: ''
}


const invoiceReducer = (state: typeof initialState, action: { name: string, value: string }) => {
    return { ...state, [action.name]: action.value }
}

export default function CreateNewPayment({ setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const createInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        if (!state.amount || !state.description || !state.name) return toast.error('Please fill all values')

        const apiUrl = 'http://localhost:5000/api/payments/create'
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": state.name,
                    "notes": state.description,
                    "amount": Number(state.amount),
                }),
            });



            if (response.ok) {
                toast.success('Payment successfully created')
                setTimeout(() => {
                    setLoading(false)
                    setOpenModal(false)
                }, 500);
                console.log('Data successfully sent to the server', response);
            } else {
                console.error('Failed to send data to the server');
                toast.error('Error creating payment');
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            }
        } catch (error) {
            console.error('Error sending data:', error);
            toast.error('Error creating invoice');
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }

        setTimeout(() => {
            setLoading(false)
        }, 500);
    };

    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/20 z-50 backdrop-blur-sm">
            <form onSubmit={createInvoice} className="form relative">
                <div className="absolute top-0 right-0 text-primary text-2xl cursor-pointer" onClick={() => setOpenModal(false)}>
                    <MdCancel />
                </div>
                <label>
                    <p>Name</p>
                    <input
                        required
                        type="name"
                        onChange={handleChange}
                        value={state.name}
                        name="name"
                    />
                </label>
                <label>
                    <p>Description</p>
                    <textarea
                        required
                        onChange={handleChange}
                        value={state.description}
                        name="description"
                        className="w-full h-40 rounded-lg text-text outline-none border-none p-4"
                        maxLength={250}
                        minLength={10}
                    />
                </label>
                <label >
                    <p>Amount</p>
                    <input
                        required
                        type="number"
                        onChange={handleChange}
                        value={state.amount}
                        name="amount"
                    />
                </label>
                <button disabled={loading} type="submit" className="w-full bg-primary disabled:bg-slate-600 hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4" onClick={createInvoice}>Create Payment</button>
            </form>
        </div>
    )
}