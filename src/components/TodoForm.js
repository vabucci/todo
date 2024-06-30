import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function TodoForm({
  handleSubmit,
  heading = false,
  text,
  setText,
  day,
  setDay,
  time,
  setTime,
  lists,
  showButtons = false,
  setShowModal = false,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit} className="TodoForm">
        <div className="text">
          {heading && <h3>{heading}</h3>}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="To do..."
            autoFocus
          />
        </div>
        <div className="remind">
          <i class="bi bi-bell"></i>
          <p>Remind Me</p>
        </div>
        <div className="pick-day">
          <div className="title">
            <i class="bi bi-calendar-check"></i>
            <p>Choose Day</p>
          </div>
          <DatePicker value={day} onChange={(day) => setDay(day)} />
        </div>
        <div className="pick-time">
          <div className="title">
            <i class="bi bi-clock"></i>
            <p>Choose Time</p>
          </div>
          <TimePicker value={time} onChange={(time) => setTime(time)} />
        </div>
        <div className="pick-list">
          <div className="title">
            <i class="bi bi-card-checklist"></i>
            <p>Choose List</p>
          </div>
          <div className="lists">
            {lists.map((list) => (
              <div className="list" key={list.id}>
                {list.name}
              </div>
            ))}
          </div>
        </div>
        {/*  */}
        {showButtons && (
          <div>
            <div className="cancel" onClick={() => setShowModal(false)}>
              <i class="bi bi-x" style={{ fontSize: "2rem" }}></i>
            </div>
            <div className="confirm">
              <button>+ To Do</button>
            </div>
          </div>
        )}
      </form>
    </LocalizationProvider>
  );
}

export default TodoForm;