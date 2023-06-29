"use client";
import { IContact } from "@/types/contact";
import React, { FormEventHandler, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { DeleteContact, EditContact } from "@/api";
import { FaGithubSquare } from "react-icons/fa";

interface ContactProps {
  contact: IContact;
  index: number;
}

const Contact: React.FC<ContactProps> = ({ contact, index }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [nameEdit, setNameEdit] = useState<string>(contact.name);
  const [emailEdit, setEmailEdit] = useState<string>(contact.email);
  const [githubEdit, setGithubEdit] = useState<string>(contact.github);

  const handleEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await EditContact({
      id: contact.id,
      name: nameEdit,
      email: emailEdit,
      github: githubEdit,
    });

    setNameEdit("");
    setEmailEdit("");
    setGithubEdit("");
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    await DeleteContact(id);
    setOpenModalDelete(false);
    router.refresh();
  };
  return (
    <tr key={contact.id}>
      <td>{index + 1}</td>
      <td>{contact.name}</td>
      <td>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </td>
      <td>
        <a href={contact.github}>
          <span className="ml-2">{contact.github}</span>
        </a>
      </td>
      <td className="flex gap-2">
        <BiSolidEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-green-600" size={25} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleEdit}>
            <h3 className="font-bold text-lg">Add New Student Contact</h3>
            <input value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} type="text" placeholder="Input Your Name" className="input my-2 input-bordered w-full max-w-xs" />
            <input value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} type="email" placeholder="example@example.com" className="input my-2 input-bordered w-full max-w-xs" />
            <input value={githubEdit} onChange={(e) => setGithubEdit(e.target.value)} type="text" placeholder="https://github.com/example" className="input my-2 input-bordered w-full max-w-xs" />
            <button type="submit" className="input my-2 input-bordered w-full max-w-xs btn-primary">
              {" "}
              Save
            </button>
          </form>
        </Modal>
        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-600" size={25} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Are you sure, you want to delete contact?</h3>
          <button className=" w-full my-2 btn btn-error" onClick={() => handleDelete(contact.id)}>
            Yes
          </button>
        </Modal>
      </td>
    </tr>
  );
};

export default Contact;
