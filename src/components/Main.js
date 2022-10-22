import React, { useState, useRef } from "react";

export const Main = () => {
  const timerForward = [
    {
      value: "18:00(из A в B)",
      text: "18:00(из A в B)",
      hours: "18",
      minutes: "00",
    },
    {
      value: "18:30(из A в B)",
      text: "18:30(из A в B)",
      hours: "18",
      minutes: "30",
    },
    {
      value: "18:45(из A в B)",
      text: "18:45(из A в B)",
      hours: "18",
      minutes: "45",
    },
    {
      value: "19:00(из A в B)",
      text: "19:00(из A в B)",
      hours: "19",
      minutes: "00",
    },
    {
      value: "19:15(из A в B)",
      text: "19:15(из A в B)",
      hours: "19",
      minutes: "15",
    },
    {
      value: "21:00(из A в B)",
      text: "21:00(из A в B)",
      hours: "21",
      minutes: "00",
    },
  ];

  const timerBackward = [
    {
      value: "18:30(из B в A)",
      text: "18:30(из B в A)",
      hours: "18",
      minutes: "30",
    },
    {
      value: "18:45(из B в A)",
      text: "18:45(из B в A)",
      hours: "18",
      minutes: "45",
    },
    {
      value: "19:00(из B в A)",
      text: "19:00(из B в A)",
      hours: "19",
      minutes: "00",
    },
    {
      value: "19:15(из B в A)",
      text: "19:15(из B в A)",
      hours: "19",
      minutes: "15",
    },
    {
      value: "19:35(из B в A)",
      text: "19:35(из B в A)",
      hours: "19",
      minutes: "35",
    },
    {
      value: "21:50(из B в A)",
      text: "21:50(из B в A)",
      hours: "21",
      minutes: "50",
    },
    {
      value: "21:55(из B в A)",
      text: "21:55(из B в A)",
      hours: "21",
      minutes: "55",
    },
  ];

  const timer = timerForward.concat(timerBackward);

  const directions = [
    { value: "из A в B", text: "из A в B", timer: timerForward },
    { value: "из B в A", text: "из B в A", timer: timerBackward },
    {
      value: "из A в B и обратно в А",
      text: "из A в B и обратно в А",
      timer: timer,
    },
  ];

  const ticketsNumber = useRef(null);

  const [selectedDirection, setSelectedDirection] = useState(
    directions[0].value
  );
  const [time, setTime] = useState(timer[0].value);
  const [timeForward, setTimeForward] = useState(timerForward[0].value);
  const [timeAdd, setTimeAdd] = useState(timerBackward[0].value);

  const handleChangeDirection = (event) => {
    console.log(event.target.value);
    setSelectedDirection(event.target.value);
  };

  const handleChangeTime = (event) => {
    console.log("handleChangeTime", event.target.value);
    setTime(event.target.value);
  };

  const handleChangeTimeForward = (event) => {
    console.log("handleChangeTimeForward", event.target.value);
    setTimeForward(event.target.value);
  };

  const handleChangeTimeBack = (event) => {
    console.log(event.target.value);
    setTimeAdd(event.target.value);
  };

  const calculate = (hours, minutes) => {
    const start = new Date();
    start.setHours(hours, minutes);
    const fiftyMinutesInMillis = 50 * 60 * 1000;
    start.setTime(start.getTime() + fiftyMinutesInMillis);
    return start.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  const calculateMinus = (hours, minutes) => {
    const start = new Date();
    start.setHours(hours, minutes);
    const fiftyMinutesInMillis = 50 * 60 * 1000;
    start.setTime(start.getTime() - fiftyMinutesInMillis);
    return start.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleClick = () => {
    if (
      directions[0].value === selectedDirection &&
      ticketsNumber.current.value > 0
    ) {
      let eventStartTime = timerForward.find((t) => t.value === timeForward);
      return alert(
        `Вы выбрали ${
          ticketsNumber.current.value
        } билета по маршруту из A в B стоимостью ${
          ticketsNumber.current.value * 700
        }р.
          Это путешествие займет у вас 50 минут. 
          Теплоход отправляется в ${timeForward}, а прибудет в ${calculate(
          eventStartTime.hours,
          eventStartTime.minutes
        )}.`
      );
    }
    if (
      directions[1].value === selectedDirection &&
      ticketsNumber.current.value > 0
    ) {
      let eventStartTime = timerBackward.find((t) => t.value === timeAdd);
      return alert(
        `Вы выбрали ${
          ticketsNumber.current.value
        } билета по маршруту из B в A стоимостью ${
          ticketsNumber.current.value * 700
        }р.
          Это путешествие займет у вас 50 минут. 
          Теплоход отправляется в ${timeAdd}, а прибудет в ${calculateMinus(
          eventStartTime.hours,
          eventStartTime.minutes
        )}.`
      );
    } else if (ticketsNumber.current.value > 0) {
      let eventStartTime = timerForward.find((t) => t.value === timeForward);
      let eventReturnTime = timerBackward.find((t) => t.value === timeAdd);
      if (timeAdd >= timeForward) {
        return alert(
          `Вы выбрали ${
            ticketsNumber.current.value
          } билета по маршруту из А в В и обратно стоимостью ${
            ticketsNumber.current.value * 1200
          }р.
            Это путешествие в обе стороны займет у вас один час 40 минут. 
            Теплоход отправляется в ${timeForward}, а прибудет в ${calculate(
            eventStartTime.hours,
            eventStartTime.minutes
          )} Обратное отправление в ${timeAdd}, прибытие в ${calculateMinus(
            eventReturnTime.hours,
            eventReturnTime.minutes
          )}.`
        );
      } else return;
    }
  };

  return (
    <div>
      <div>
        <select value={selectedDirection} onChange={handleChangeDirection}>
          {directions.map((direction) => (
            <option key={direction.value} value={direction.value}>
              {direction.text}
            </option>
          ))}
        </select>
      </div>

      <div>
        {directions[2].value !== selectedDirection ? (
          <div>
            <select value={time} onChange={handleChangeTime}>
              {directions
                .find((d) => d.value === selectedDirection)
                .timer.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.text}
                  </option>
                ))}
            </select>
          </div>
        ) : (
          <div>
            <select value={timeForward} onChange={handleChangeTimeForward}>
              {timerForward.map((timeForward) => (
                <option key={timeForward.value} value={timeForward.value}>
                  {timeForward.text}
                </option>
              ))}
            </select>
            <select value={timeAdd} onChange={handleChangeTimeBack}>
              {timerBackward.map((timeAdd) => (
                <option key={timeAdd.value} value={timeAdd.value}>
                  {timeAdd.text}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div>
        <label htmlFor="num">Количество билетов</label>
        <input ref={ticketsNumber} id="num" />
        <button onClick={handleClick}>Посчитать</button>
      </div>
    </div>
  );
};
