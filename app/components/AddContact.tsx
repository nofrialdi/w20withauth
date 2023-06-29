"use client";
import React, { FormEventHandler, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import Modal from "./Modal";
import { AddNewContact } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const AddContact = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newNameValue, setNewNameValue] = useState<string>("");
  const [newEmailValue, setNewEmailValue] = useState<string>("");
  const [newGithubValue, setNewGithubValue] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await AddNewContact({
      id: uuidv4(),
      name: newNameValue,
      email: newEmailValue,
      github: newGithubValue,
    });

    setNewEmailValue("");
    setNewNameValue("");
    setNewGithubValue("");
    setModalOpen(false);
    router.refresh();
  };
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        <FaAddressBook className="ml-2" size={18} />
        Add Student Contact
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg w-full">Edit Student Contact</h3>
          <input value={newNameValue} onChange={(e) => setNewNameValue(e.target.value)} type="text" placeholder="Input Your Name" className="input my-2 input-bordered w-full max-w-xs" />
          <input value={newEmailValue} onChange={(e) => setNewEmailValue(e.target.value)} type="email" placeholder="example@example.com" className="input my-2 input-bordered w-full max-w-xs" />
          <input value={newGithubValue} onChange={(e) => setNewGithubValue(e.target.value)} type="text" placeholder="https://github.com/example" className="input my-2 input-bordered w-full max-w-xs" />
          <button type="submit" className="input my-2 input-bordered w-full max-w-xs btn-primary">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};
