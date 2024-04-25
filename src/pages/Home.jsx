import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Reservations } from "../utils/mockData";
import { Input, Select, DatePicker, Space, Button } from "antd";
import ReservationsList from "../components/ReservationsList";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const Home = () => {
  const [filteredReservations, setFilteredReservations] =
    useState(Reservations);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [filters, setFilters] = useState({
    username: "",
    status: "",
    date: null,
    shift: "",
    area: "",
  });

  const handleSearch = () => {
    let filteredData = Reservations.filter((reservation) => {
      let matchesFilters = true;
      if (
        filters.username &&
        !(
          reservation.customer.firstName
            .toLowerCase()
            .includes(filters.username.toLowerCase()) ||
          reservation.customer.lastName
            .toLowerCase()
            .includes(filters.username.toLowerCase())
        )
      ) {
        matchesFilters = false;
      }
      if (filters.status && reservation.status !== filters.status) {
        matchesFilters = false;
      }

      if (
        filters.date &&
        (dayjs(reservation.start).isBefore(dayjs(filters.date[0])) ||
          dayjs(reservation.end).isAfter(dayjs(filters.date[1]).add(1, "day")))
      ) {
        matchesFilters = false;
      }
      if (filters.shift && reservation.shift !== filters.shift) {
        matchesFilters = false;
      }
      if (filters.area && reservation.area !== filters.area) {
        matchesFilters = false;
      }
      return matchesFilters;
    });

    setFilteredReservations(filteredData);
  };

  const handleResetFilters = () => {
    setFilters({
      username: "",
      status: "",
      date: null,
      shift: "",
      area: "",
    });
    setFilteredReservations(Reservations);
  };
  return (
    <>
      <Navbar />
      <div className="home-page-content">
        <div className="filters-container">
          <h2 className="filters-container-title">Reservations Search:</h2>
          <div className="filters-wrapper">
            <div className="filter-item-container">
              <p className="filter-title">Username:</p>
              <Input
                type="text"
                placeholder="Enter Username"
                style={{ width: 180, height: 30, marginRight: 20 }}
                value={filters.username}
                onChange={(e) => {
                  setFilters({ ...filters, username: e.target.value });
                }}
              />
            </div>
            <div className="filter-item-container">
              <p className="filter-title">Status:</p>
              <Select
                style={{ width: 180, height: 30, marginRight: 20 }}
                value={filters.status ? filters.status : "choose"}
                onChange={(value) => setFilters({ ...filters, status: value })}
              >
                <Select.Option value="choose" disabled>
                  Choose a status
                </Select.Option>
                <Select.Option value="CONFIRMED">Confirmed</Select.Option>
                <Select.Option value="SEATED">Seated</Select.Option>
                <Select.Option value="CHECKED OUT">Checked out</Select.Option>
                <Select.Option value="NOT CONFIRMED">
                  Not confirmed
                </Select.Option>
              </Select>
            </div>
            <div className="filter-item-container">
              <p className="filter-title">Date:</p>
              <Space direction="vertical" size={12}>
                <RangePicker
                  picker="date"
                  style={{
                    width: windowWidth < 400 ? windowWidth - 100 : 300,
                    height: 30,
                    marginRight: 20,
                  }}
                  value={filters.date}
                  onChange={(dates) => {
                    setFilters({ ...filters, date: dates });
                  }}
                />
              </Space>
            </div>
            <div className="filter-item-container">
              <p className="filter-title">Shifts:</p>
              <Select
                style={{ width: 180, height: 30, marginRight: 20 }}
                value={filters.shift ? filters.shift : "choose"}
                onChange={(value) => setFilters({ ...filters, shift: value })}
              >
                <Select.Option value="choose" disabled>
                  Choose a Shift
                </Select.Option>
                <Select.Option value="BREAKFAST">Breakfast</Select.Option>
                <Select.Option value="LUNCH">Lunch</Select.Option>
                <Select.Option value="DINNER">Dinner</Select.Option>
              </Select>
            </div>
            <div className="filter-item-container">
              <p className="filter-title">Area:</p>
              <Select
                style={{ width: 180, height: 30, marginRight: 20 }}
                value={filters.area ? filters.area : "choose"}
                onChange={(value) => setFilters({ ...filters, area: value })}
              >
                <Select.Option value="choose" disabled>
                  Choose an Area
                </Select.Option>
                <Select.Option value="BAR">Bar</Select.Option>
                <Select.Option value="MAIN ROOM">Main room</Select.Option>
              </Select>
            </div>
            <div className="buttons-container">
              <Button className="action-button" onClick={handleSearch}>
                <SearchOutlined />
                Search
              </Button>
              <Button className="action-button" onClick={handleResetFilters}>
                <CloseCircleOutlined />
                Reset filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ReservationsList reservation={filteredReservations} />
      {filteredReservations?.length === 0 && (
        <div className="empty-list-container">
          <h1 className="empty-list-title">No reservations found</h1>
        </div>
      )}
    </>
  );
};

export default Home;
