"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

// Add user properties to the AdapterUser
// By default AdapterUser only supports email, name & image url
type UserTypeExtension = AdapterUser & {
  walletId?: string | null | undefined; // Add walletId property
};

// Add custom session key to the Session, because session is defined by AdapterUser by default
// Hence the default session keys are email, name and image url
type SessionTypeExtension = Session & {
  user?: UserTypeExtension | null | undefined;
};

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

function AuthButton() {
  const { data: session } = useSession() as { data: SessionTypeExtension };

  console.log("session ", session);

  if (session) {
    return (
      <>
        {session?.user?.email} <br />
        {session?.user?.walletId
          ? session.user.walletId
          : "Wallet ID not available"}
        <br />
        <button className="border border-1" onClick={() => signOut()}>
          Sign out (This just destroy Next Auth Session not Sequence)
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      {/* <button onClick={() => signIn()}>Sign in</button> */}
      Note: Click Login Button Below To Sign In
    </>
  );
}

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <div>
      <AuthButton />
      <hr className="my-4" />
      <ul>
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        {/* <Link href="/protected">
          <li
            className={
              pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Protected Route
          </li>
        </Link> */}
        <Link href="/serverAction">
          <li
            className={
              pathname === "/serverAction" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Server Action
          </li>
        </Link>
        {/* <Link href="/apiFromClient">
          <li
            className={
              pathname === "/apiFromClient" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Client
          </li>
        </Link> */}
        <Link href="/apiFromServer">
          <li
            className={
              pathname === "/apiFromServer" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Server
          </li>
        </Link>
      </ul>
    </div>
  );
}
