import React from "react";
import dayjs from "dayjs";
import {
  CheckOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

const ReservationListItem = ({ reservation }) => {
  let statusClassName, statusText, statusIcon;
  switch (reservation?.status) {
    case "CHECKED OUT":
      statusClassName = "checked-status-field";
      statusText = "Checked out";
      statusIcon = <CheckOutlined color="white" />;
      break;
    case "SEATED":
      statusClassName = "seated-status-field";
      statusText = "Seated";
      statusIcon = <CheckSquareOutlined color="white" />;
      break;
    case "NOT CONFIRMED":
      statusClassName = "notConfirmed-status-field";
      statusText = "Not confirmed";
      statusIcon = <CloseCircleOutlined color="white" />;
      break;
    case "CONFIRMED":
      statusClassName = "confirmed-status-field";
      statusText = "Confirmed";
      statusIcon = <CheckCircleOutlined color="white" />;
      break;
    default:
      statusClassName = "";
      statusText = "";
      statusIcon = null;
  }

  return (
    <tr key={reservation?.id} className="table-row-container">
      <td>{reservation?.id}</td>
      <td>
        {reservation?.customer.firstName} {reservation?.customer.lastName}
      </td>
      <td>
        <div className={statusClassName}>
          {statusText} {statusIcon}
        </div>
      </td>
      <td>{reservation?.shift}</td>
      <td>
        <div>{dayjs(reservation?.start).format("YYYY-MM-DD")}</div>
        <div>{dayjs(reservation?.start).format("hh:mm A")}</div>
      </td>
      <td>
        <div>{dayjs(reservation?.end).format("YYYY-MM-DD")}</div>
        <div>{dayjs(reservation?.end).format("hh:mm A")}</div>
      </td>
      <td>{reservation?.quantity}</td>
      <td>
        <div className="reservation-area-container">{reservation?.area}</div>
      </td>
      <td>{reservation?.guestNotes}</td>
    </tr>
  );
};

export default ReservationListItem;
