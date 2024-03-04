import { getServerSession } from "next-auth";

import WhoAmIButton from "./WhoAmIButton";

export default async function ServerActionPage() {
  const whoAmI = async () => {
    "use server";
    const session = await getServerSession();
    return session?.user?.email || "Not Logged In";
  };
  return (
    <div>
      <WhoAmIButton whoAmIAction={whoAmI} />
    </div>
  );
}