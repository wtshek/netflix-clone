import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-white">Netflix Clone</h1>
      {user?.name}
      <button className="text-white" onClick={() => signOut()}>
        Signout!
      </button>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/auth", permanent: false } };
  }

  return {
    props: {},
  };
}
