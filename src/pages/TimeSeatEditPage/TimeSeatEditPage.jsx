import styles from "./TimeSeatEditPage.module.scss";
import Swal from "sweetalert2";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import SelectTableCount from "../../components/Select/SelectTableCount/SelectTableCount";
import Button from "../../components/Button/Button";


import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getTimes,
  postTime,
  deleteTime,
  getTables,
  postTable,
  putTable,
  deleteTable,
} from "../../api/cafe";

const themePicker = createTheme({
  palette: {
    primary: {
      main: "#0A7E8B",
    },
    secondary: {
      main: "#c81d25",
    },
  },

  typography: {
    fontSize: 16,
  },

  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

// 將 HHMM 格式的時間轉換為 HH:MM 格式的函數
function formatTime(time) {
  const hours = time.slice(0, 2);
  const minutes = time.slice(2, 4);
  return `${hours}:${minutes}`;
}

//CheckboxLabels
export function CheckboxLabels({ label, checked, onChange }) {
  return (
    <ThemeProvider theme={themePicker}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={label}
        />
      </FormGroup>
    </ThemeProvider>
  );
}

//預計形式，將時段使用checkbox渲染，已有者defaultChecked，在使用者每一次勾選方塊時，只要是checked就是postTime，只要取消勾選就是deleteTime這樣的方式。需處理API錯誤的訊息。

export default function TimeSeatEditPage() {
  // const [checked, setChecked] = useState(false)
  const availableTimeSlots = [
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
  ];
  // const [timeSlots, setTimeSlots] = useState(availableTimeSlots);
  const [checkedTimeSlots, setCheckedTimeSlots] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const initialTimeSlots = availableTimeSlots.map((slot) => {
      return {
        timeslot: slot,
        checked: false,
        id: null,
      };
    });
    setCheckedTimeSlots(initialTimeSlots);

    const fetchData = async () => {
      try {
        const timesData = await getTimes(id);
        const initialCheckedTimeSlots = initialTimeSlots.map((slot) => {
          const matchingTimeSlot = timesData.find(
            (timeData) => timeData.timeslot === slot.timeslot
          );
          if (matchingTimeSlot) {
            return {
              timeslot: slot.timeslot,
              checked: true,
              id: matchingTimeSlot.id,
            };
          }
          return slot;
        });
        setCheckedTimeSlots(initialCheckedTimeSlots);
      } catch (error) {
        console.error("Error fetching times from API: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTimeSlotChange = async (index) => {
    console.log("Check");
    const updatedTimeSlots = [...checkedTimeSlots];
    updatedTimeSlots[index].checked = !updatedTimeSlots[index].checked;

    if (updatedTimeSlots[index].checked) {
      // 如果勾選，跳出確認視窗
      Swal.fire({
        title: "Do you want to add the time?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          try {
            const response = await postTime({
              cafeId: id,
              timeslot: updatedTimeSlots[index].timeslot,
            });
            console.log("postTime API 回傳訊息：", response);
            if (response.status === "success") {
              try {
                // 重新取得所有時段資訊
                const timesData = await getTimes(id);
                const newId = timesData.find(
                  (timeData) =>
                    timeData.timeslot === updatedTimeSlots[index].timeslot
                ).id;

                updatedTimeSlots[index].id = newId;

                Swal.fire(response.message, "", "success");
                setCheckedTimeSlots(updatedTimeSlots);
                console.log(updatedTimeSlots);
              } catch (error) {
                console.error("Error fetching times from API: ", error);
                // 處理錯誤，保留原狀態
                updatedTimeSlots[index].checked = false;
                setCheckedTimeSlots(updatedTimeSlots);
              }
            } else if (response.message === "Network Error") {
              Swal.fire(response.message, "", "error");
              console.log("failed", updatedTimeSlots);
              updatedTimeSlots[index].checked = false;
              setCheckedTimeSlots(updatedTimeSlots);
            } else {
              Swal.fire(response.response.data.message, "", "error");
              console.log("failed", updatedTimeSlots);
              setCheckedTimeSlots(updatedTimeSlots);
            }
          } catch (error) {
            console.error("postTime API 錯誤：", error);
            updatedTimeSlots[index].checked = false;
            setCheckedTimeSlots(updatedTimeSlots);
          }
        } else if (result.isDenied) {
          // 如果取消確認，取消勾選
          console.log("cancel");
          updatedTimeSlots[index].checked = false;
          setCheckedTimeSlots(updatedTimeSlots);
        }
      });
    }

    if (!updatedTimeSlots[index].checked) {
      // 如果取消勾選，跳出確認視窗
      Swal.fire({
        title: "Do you want to remove the time?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          try {
            const response = await deleteTime(updatedTimeSlots[index].id);
            console.log("deleteTime API 回傳訊息：", response);
            if (response.status === "success") {
              Swal.fire(response.message, "", "success");
              updatedTimeSlots[index].checked = false;
              setCheckedTimeSlots(updatedTimeSlots);
              console.log(updatedTimeSlots);
            } else if (response.message === "Network Error") {
              Swal.fire(response.message, "", "error");
              console.log("failed", updatedTimeSlots);
              updatedTimeSlots[index].checked = true;
              setCheckedTimeSlots(updatedTimeSlots);
            } else {
              Swal.fire(response.response.data.message, "", "error");
              console.log("failed", updatedTimeSlots);
              setCheckedTimeSlots(updatedTimeSlots);
            }
          } catch (error) {
            console.error("deleteTime API 錯誤：", error);
            updatedTimeSlots[index].checked = true;
            setCheckedTimeSlots(updatedTimeSlots);
          }
        } else if (result.isDenied) {
          // 如果取消確認，取消勾選
          console.log("cancel");
          updatedTimeSlots[index].checked = true;
          setCheckedTimeSlots(updatedTimeSlots);
        }
      });
    }
  };

  /////////////////Edit Table Section///////////////
  const [tableCounts, setTableCounts] = useState({});
  const [countChangedMap, setCountChangedMap] = useState({});


  useEffect(() => {
    const fetchTableCounts = async () => {
      try {
        const tablesData = await getTables(id);
        console.log("1", tablesData);
        // 將 API 回傳的座位數據設置到 tableCounts 中
        //acc = accumulator
        const newTableCounts = tablesData.reduce(
          (acc, table) => ({
            ...acc,
            [table.seat]: {
              count: table.count,
              id: table.id,
              initialCount: table.count,
            },
          }),
          {}
        );

        setTableCounts(newTableCounts);
        console.log('2',newTableCounts);
      } catch (error) {
        console.error("Error fetching tables from API: ", error);
      }
    };

    fetchTableCounts();
  }, [id]);

  const handleTableCountChange = (seat, count) => {
    console.log(`Updating seat ${seat} count to ${count}`);

    setCountChangedMap((prevCountChangedMap) => ({
      ...prevCountChangedMap,
      [seat]: true,
    }));

    setTableCounts((prevTableCounts) => ({
      ...prevTableCounts,
      [seat]: {
        count,
        initialCount: prevTableCounts[seat]?.initialCount || 0,
        id: prevTableCounts[seat]?.id,
      },
    }));
  };


  const seatOptions = [1, 2, 4, 6, 8]; // 不同座位數的選項

  ///////////Submit Button Logic////////
  const submitToTableApi = async (seat) => {
    const initialCount = tableCounts[seat]?.initialCount || 0;
    const currentCount = tableCounts[seat]?.count;
    console.log("initial",initialCount, "current", currentCount, seat, id);

    if (initialCount === 0 && currentCount > 0) {
      // 使用 postTable API
      try {
        const response = await postTable({
          cafeId: id,
          seat: seat,
          count: currentCount,
        });
        console.log("postTable API 回傳訊息：", response);
        if (response.status === "success") {
          // 成功處理
          // 更新 initialCount
          setTableCounts((prevTableCounts) => ({
            ...prevTableCounts,
            [seat]: {
              ...prevTableCounts[seat],
              initialCount: currentCount, // 更新為 currentCount
            },
          }));

          // 更新 countChangedMap
          console.log("Table added successfully!");
          setCountChangedMap((prevCountChangedMap) => ({
            ...prevCountChangedMap,
            [seat]: false,
          }));

          // 重新取得所有桌子資訊
          try {
            const updatedTablesData = await getTables(id);
            // 更新桌子資訊
            const newId = updatedTablesData.find(
              (table) => table.seat === seat
            )?.id;
            setTableCounts((prevTableCounts) => ({
              ...prevTableCounts,
              [seat]: {
                ...prevTableCounts[seat],
                id: newId,
              },
            }));
            console.log("Tables updated:", updatedTablesData);
          } catch (error) {
            console.error("Error fetching tables from API: ", error);
          }

        } else {
          // 處理 API 錯誤
          console.error("Error adding table: ", response.message);
        }
      } catch (error) {
        console.error("postTable API 錯誤：", error);
      }
    } else if (initialCount !== 0 && currentCount !== 0) {
      // 使用 putTable API
      try {
        const response = await putTable({
          id: tableCounts[seat]?.id,
          count: currentCount,
        });
        console.log("putTable API 回傳訊息：", response);
        if (response.status === "success") {
          // 成功處理
          console.log("Table updated successfully!");
          // 更新 initialCount
          setTableCounts((prevTableCounts) => ({
            ...prevTableCounts,
            [seat]: {
              ...prevTableCounts[seat],
              initialCount: currentCount, // 更新為 currentCount
            },
          }));

          // 更新 countChangedMap
          setCountChangedMap((prevCountChangedMap) => ({
            ...prevCountChangedMap,
            [seat]: false,
          }));
        } else {
          // 處理 API 錯誤
          console.error("Error updating table: ", response.message);
        }
      } catch (error) {
        console.error("putTable API 錯誤：", error);
      }
    } else if (initialCount !== 0 && currentCount === 0) {
      // 使用 deleteTable API
      try {
        const response = await deleteTable(tableCounts[seat]?.id);
        console.log("deleteTable API 回傳訊息：", response);
        if (response.status === "success") {
          // 成功處理
          console.log("Table deleted successfully!");
          // 更新 initialCount
          setTableCounts((prevTableCounts) => ({
            ...prevTableCounts,
            [seat]: {
              ...prevTableCounts[seat],
              initialCount: currentCount, // 更新為 currentCount
            },
          }));

          // 更新 countChangedMap
          setCountChangedMap((prevCountChangedMap) => ({
            ...prevCountChangedMap,
            [seat]: false,
          }));
        } else {
          // 處理 API 錯誤
          console.error("Error deleting table: ", response.message);
        }
      } catch (error) {
        console.error("deleteTable API 錯誤：", error);
      }
    }
  };
  //////////////////////////////////////

  return (
    <div className={styles.container}>
      <div className={styles.textContent}>
        <h1 className={styles.title}>Operating hours & seats.</h1>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.timeWrapper}>
          {checkedTimeSlots.map((timeSlot, index) => (
            <CheckboxLabels
              key={timeSlot.timeslot}
              label={formatTime(timeSlot.timeslot)}
              checked={timeSlot.checked}
              onChange={() => handleTimeSlotChange(index)}
            />
          ))}
        </div>
        <div className={styles.seatWrapper}>
          <div className={styles.seatGroup}>
            {seatOptions.map((seat) => (
              <div key={seat} className={styles.seatItem}>
                {console.log(
                  `Rendering seat ${seat}, count: ${tableCounts[seat]?.count}`
                )}

                <SelectTableCount
                  key={seat}
                  id={tableCounts[seat]?.id}
                  seatFor={seat}
                  count={tableCounts[seat]?.count || 0}
                  onCountChange={(count) => handleTableCountChange(seat, count)}
                />
                <Button
                  text={"Save"}
                  color={"primary"}
                  size={"medium"}
                  onClick={() => submitToTableApi(seat)}
                  disabled={!countChangedMap[seat]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
