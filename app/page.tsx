import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { AddContact } from "./components/AddContact";
import ListContact from "./components/ListContact";
import { getAllContact } from "@/api";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const data = await getAllContact();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold"> List Student Contact App</h1>
        <AddContact />
      </div>
      <ListContact data={data} />
    </main>
  );
}
