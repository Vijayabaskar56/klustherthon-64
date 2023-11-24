import { FaPlus, FaTrash } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";

export function CreateInvoice({ setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div
            className="cursor-pointer flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setOpenModal(true)}

        >
            <span className="hidden md:block">Create Invoice</span>
            <div className="md:ml-4">
                <FaPlus />
            </div>
        </div>
    );
}

export function UpdateInvoice({ id }: { id: string }) {
    return (
        <div
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <div className="text-slate-600">
                <HiPencil />
            </div>
        </div>
    );
}

export function DeleteInvoice({ id }: { id: string }) {
    // const deleteInvoiceWithId = deleteInvoice.bind(null, id);

    return (
        <form>
            <button className="rounded-md border p-2 hover:bg-gray-100" type="submit">
                <span className="sr-only">Delete</span>
                <div className="text-slate-600">
                    <FaTrash />
                </div>
            </button>
        </form>
    );
}