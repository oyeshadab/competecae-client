import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertCard from "../../Alert/Alert";

const icons = [
  {
    id: 33,
    title: "Email",
    url: "/",
    icon: "/images/Group 144 (1).svg",
  },
  {
    id: 32,
    title: "Notification",
    url: "/",
    icon: "/images/Group 46.svg",
  },
];

const Notifications = [
  {
    id: 1,
    title: "Today",
    alerts: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    title: "Past Week",
    alerts: [1, 2, 3, 4, 5],
  },
];

export default function Status() {
  const AlertDropdown = (url, icon, title, id) => (
    <Dropdown flip={true}>
      <Dropdown.Toggle className="alert-dropdown-toggle" variant="link" id={`dropdown-${id}`}>
        <Link to={url}>
          <img src={icon} alt={title} />
        </Link>
      </Dropdown.Toggle>
      <Dropdown.Menu
        id="alert-dropdown-menu"
        className="alert-dropdown max-h-[800px] overflow-auto"
      >
        {Notifications.map((item) => (
          <>
            <h1 className="font-bold text-violet text-[16px] px-4 mt-4 mb-3">
              {item.title}
            </h1>
            {item.alerts.map((alert, index) => (
              <Dropdown.Item
                key={index}
                href={url}
                style={{ whiteSpace: "normal" }}
              >
                <AlertCard />
              </Dropdown.Item>
            ))}
          </>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
  return (
    <div>
      <ul className="flex list-none gap-7 items-center">
        {icons.map(({ id, title, url, icon }) => (
          <li key={id}>
            {id === 32 ? (
              AlertDropdown(url, icon, title, id)
            ) : (
              <Link to={url}>
                <img src={icon} alt={title} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
