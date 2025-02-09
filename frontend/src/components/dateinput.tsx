"use client";

import { useState, useRef } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DateInput = ({ value, onChange }: DateInputProps) => {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const datePickerRef = useRef<DatePicker | null>(null);

  const isValidDate = (day: number, month: number, year: number) => {
    if (month < 1 || month > 12 || day < 1 || day > 31) return false;
    const formattedDate = new Date(year, month - 1, day);
    return (
      !isNaN(formattedDate.getTime()) &&
      (month !== 2 || day <= 29) &&
      (month !== 2 || day !== 29 || year % 4 === 0)
    );
  };

  const handleChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      onChange(formattedDate);
      setError("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); 

    if (value.length > 8) {
      value = value.slice(0, 8); // Limita a 8 caracteres (DDMMYYYY)
    }

    let day = value.slice(0, 2);
    let month = value.slice(2, 4);
    let year = value.slice(4, 8);

    if (Number(day) > 31) day = "31";
    if (Number(month) > 12) month = "12";

    let formattedValue = day;
    if (value.length > 2) {
      formattedValue += "/" + month;
    }
    if (value.length > 4) {
      formattedValue += "/" + year;
    }

    onChange(formattedValue);
    setError("");
  };

  const handleBlur = () => {
    if (value.length === 10) {
      const [day, month, year] = value.split("/").map(Number);
      if (!isValidDate(day, month, year)) {
        setError("Data inválida");
      } else {
        onChange(
          new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
        setError("");
      }
    }
  };

  return (
    <div className="flex flex-col items-start w-60">
      <div className="block w-full text-center text-lg font-semibold text-white bg-teal-600 px-4 py-2 rounded-t-lg">
        Data de Aplicação
      </div>
      <div
        className={`relative w-full rounded-b-lg flex items-center`}
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <input
          ref={inputRef}
          style={{ backgroundColor: "#D9D9D9" }}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="DD/MM/AAAA"
          className="w-full px-3 py-2 text-gray-900 text-center rounded-b-lg focus:outline-none"
          autoComplete="off"
          maxLength={10}
        />
        <FaRegCalendarAlt
          className="absolute right-3 text-gray-500 cursor-pointer hover:text-teal-600 transition-colors"
          onClick={() => datePickerRef.current?.setOpen(true)}
        />
        <DatePicker
          ref={datePickerRef}
          selected={
            error || value.length !== 10
              ? null
              : new Date(value.split("/").reverse().join("-"))
          }
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          className="hidden"
          customInput={<div />}
          popperClassName="z-50"
          calendarClassName="bg-teal-600 text-white rounded-lg shadow-lg"
          dayClassName={(date) =>
            "text-white hover:bg-teal-600 rounded-md px-2 py-1"
          }
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex justify-between items-center px-4 py-2 bg-teal-600 text-white ">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="px-2 py-1 rounded hover:bg-teal-500 disabled:opacity-50"
              >
                {"<"}
              </button>
              <span className="font-semibold">
                {date.toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="px-2 py-1 rounded hover:bg-teal-500 disabled:opacity-50"
              >
                {">"}
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default DateInput;
