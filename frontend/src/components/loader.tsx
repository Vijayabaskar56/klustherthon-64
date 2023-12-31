export default function Loader({ dark }: { dark?: boolean }) {
    return (
        <div className={`w-5 h-5 rounded-full border-2 ${dark ? "border-slate-200 border-t-primary" : "border-white border-t-transparent"} animate-spin`}></div>
    )
}
