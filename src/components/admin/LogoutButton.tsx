import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { signOutAction } from "@/lib/actions/auth";

export function LogoutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
      >
        <SignOut size={18} />
        Keluar
      </button>
    </form>
  );
}
