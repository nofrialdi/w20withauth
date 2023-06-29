import { IContact } from "./types/contact";

// const baseUrl = "http://localhost:5000";
const baseUrl = "https://649c24cc04807571923788e7.mockapi.io";

export const getAllContact = async (): Promise<IContact[]> => {
  const res = await fetch(`${baseUrl}/contact`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export const AddNewContact = async (contact: IContact): Promise<IContact[]> => {
  const res = await fetch(`${baseUrl}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  const newContact = await res.json();
  return newContact;
};

export const EditContact = async (contact: IContact): Promise<IContact[]> => {
  const res = await fetch(`${baseUrl}/contact/${contact.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  const updateContact = await res.json();
  return updateContact;
};

export const DeleteContact = async (id: String): Promise<void> => {
  await fetch(`${baseUrl}/contact/${id}`, {
    method: "DELETE",
  });
};
