import { IContact } from "@/types/contact";
import React, { useState } from "react";

import Contact from "./Contact";

interface ContactListProp {
  data: IContact[];
}

const ListContact: React.FC<ContactListProp> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Github</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact, index) => (
            <Contact key={contact.id} contact={contact} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListContact;
