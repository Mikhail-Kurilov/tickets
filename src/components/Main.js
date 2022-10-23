import React, {useState, useRef} from "react";

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
        {value: "из A в B", text: "из A в B", timer: timerForward},
        {value: "из B в A", text: "из B в A", timer: timerBackward},
        {
            value: "из A в B и обратно в А",
            text: "из A в B и обратно в А",
            timer: timer,
        },
    ];

    const ticketsNumber = useRef(null);

    const [selectedDirection, setSelectedDirection] = useState(
        directions[0]
    );
    const [time, setTime] = useState(timer[0]);
    const [timeForward, setTimeForward] = useState(timerForward[0]);
    const [timeBackward, setTimeBackward] = useState(timerBackward[0]);

    const handleChangeDirection = (event) => {
        let direction = directions.find((d) => d.value === event.target.value);
        setSelectedDirection(direction);
    };

    const handleChangeTime = (event) => {
        let time = timer.find((t) => t.value === event.target.value);
        setTime(time);
    };

    const handleChangeTimeForward = (event) => {
        let time = timerForward.find((t) => t.value === event.target.value);
        setTimeForward(time);
    };

    const handleChangeTimeBack = (event) => {
        let time = timerBackward.find((t) => t.value === event.target.value);
        setTimeBackward(time);
    };

    const DEFAULT_ARRIVAL_INTERVAL = 50 * 60 * 1000;
    const MSC_TIMEZONE_OFFSET = 180;

    const calculateTime = (hours, minutes, isArrival = false) => {
        const date = new Date();
        date.setHours(hours, minutes);
        let timezoneDifference = (date.getTimezoneOffset() + MSC_TIMEZONE_OFFSET) * 60 * 1000;
        date.setTime(date.getTime() - timezoneDifference + getArrivalInterval(isArrival));
        return getDateAsLocalString(date);
    };

    const getArrivalInterval = (isArrival) => {
        return isArrival ? DEFAULT_ARRIVAL_INTERVAL : 0;
    }

    const getDateAsLocalString = (date) => {
        return date.toLocaleString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    const constructDate = (timer) => {
        const date = new Date();
        date.setHours(timer.hours, timer.minutes);
        return date;
    }

    const handleClick = () => {
        if (
            directions[0].value === selectedDirection.value &&
            ticketsNumber.current.value > 0
        ) {
            return alert(
                `Вы выбрали ${
                    ticketsNumber.current.value
                } билета по маршруту из A в B стоимостью ${
                    ticketsNumber.current.value * 700
                }р.
          Это путешествие займет у вас 50 минут. 
          Теплоход отправляется в ${calculateTime(
                    timeForward.hours,
                    timeForward.minutes
                )}, а прибудет в ${calculateTime(
                    timeForward.hours,
                    timeForward.minutes,
                    true
                )}.`
            );
        }
        if (
            directions[1].value === selectedDirection.value &&
            ticketsNumber.current.value > 0
        ) {
            return alert(
                `Вы выбрали ${
                    ticketsNumber.current.value
                } билета по маршруту из B в A стоимостью ${
                    ticketsNumber.current.value * 700
                }р.
          Это путешествие займет у вас 50 минут. 
          Теплоход отправляется в ${calculateTime(timeBackward.hours, timeBackward.minutes)}, 
          а прибудет в ${calculateTime(timeBackward.hours, timeBackward.minutes, true)}.`
            );
        } else if (ticketsNumber.current.value > 0) {
            if (constructDate(timeBackward) > constructDate(timeForward)) {
                return alert(
                    `Вы выбрали ${
                        ticketsNumber.current.value
                    } билета по маршруту из А в В и обратно стоимостью ${
                        ticketsNumber.current.value * 1200
                    }р.
            Это путешествие в обе стороны займет у вас один час 40 минут. 
            Теплоход отправляется в ${calculateTime(timeForward.hours, timeForward.minutes)}, 
            а прибудет в ${calculateTime(timeForward.hours, timeForward.minutes, true)} 
            Обратное отправление в ${calculateTime(timeBackward.hours, timeBackward.minutes)}, 
            прибытие в ${calculateTime(timeBackward.hours, timeBackward.minutes, true)}.`
                );
            } else return;
        }
    };

    return (
        <div>
            <div>
                <select value={selectedDirection.value} onChange={handleChangeDirection}>
                    {directions.map((direction) => (
                        <option key={direction.value} value={direction.value}>
                            {direction.text}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {directions[2].value !== selectedDirection.value ? (
                    <div>
                        <select value={time.value} onChange={handleChangeTime}>
                            {selectedDirection.timer.map((time) => (
                                <option key={time.value} value={time.value}>
                                    {calculateTime(time.hours, time.minutes)}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div>
                        <select value={timeForward.value} onChange={handleChangeTimeForward}>
                            {timerForward.map((timeForward) => (
                                <option key={timeForward.value} value={timeForward.value}>
                                    {`${calculateTime(timeForward.hours, timeForward.minutes)}
                                    (из А в В)`}
                                </option>
                            ))}
                        </select>
                        <select value={timeBackward.value} onChange={handleChangeTimeBack}>
                            {timerBackward.map((timeBackward) => (
                                <option key={timeBackward.value} value={timeBackward.value}>
                                    {`${calculateTime(timeBackward.hours, timeBackward.minutes)}
                                    (из В в А)`}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="num">Количество билетов</label>
                <input ref={ticketsNumber} id="num"/>
                <button onClick={handleClick}>Посчитать</button>
            </div>
        </div>
    );
};
