import React, { useState } from "react";
import ReservationListItem from "./ReservationListItem";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const ReservationsList = ({ reservation }) => {
  const [sortByID, setSortByID] = useState(null);
  const [sortByUsername, setSortByUsername] = useState(null);

  const handleSortByID = () => {
    setSortByUsername(null);
    setSortByID(sortByID === "asc" ? "desc" : "asc");
  };

  const handleSortByUsername = () => {
    setSortByID(null);
    setSortByUsername(sortByUsername === "asc" ? "desc" : "asc");
  };

  const sortedReservations = [...reservation].sort((a, b) => {
    if (sortByID) {
      return sortByID === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortByUsername) {
      const usernameA =
        `${a.customer.firstName} ${a.customer.lastName}`.toLowerCase();
      const usernameB =
        `${b.customer.firstName} ${b.customer.lastName}`.toLowerCase();
      return sortByUsername === "asc"
        ? usernameA.localeCompare(usernameB)
        : usernameB.localeCompare(usernameA);
    }
    return 0;
  });
  return (
    <div className="reservations-list-container">
      <table className="table-container">
        <thead className="table-header">
          <tr>
            <th onClick={handleSortByID}>
              ID {sortByID === "asc" && <ArrowUpOutlined />}{" "}
              {sortByID === "desc" && <ArrowDownOutlined />}
            </th>
            <th onClick={handleSortByUsername}>
              Customer {sortByUsername === "asc" && <ArrowUpOutlined />}{" "}
              {sortByUsername === "desc" && <ArrowDownOutlined />}
            </th>
            <th>Status</th>
            <th>Shift</th>
            <th>Start</th>
            <th>End</th>
            <th>Quantity</th>
            <th>Area</th>
            <th>Guest Notes</th>
          </tr>
        </thead>
        <tbody>
          {sortedReservations?.map((reservation) => (
            <ReservationListItem reservation={reservation} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsList;
