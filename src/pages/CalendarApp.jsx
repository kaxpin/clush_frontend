import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import { Badge, Calendar } from 'antd';
import { useEffect, useState } from 'react';
import Calendarpop from '../pages/calendar/components/CalendarAddpop';
import useAuthStore from '../auth/auth';
import { selectCalendarInfo } from '../api/CalendarApiService';
import usePopupStore from '../store/popupStore';


export default function CalendarApp(props) {

  const { isAuthenticated, userId, login, logout } = useAuthStore();
  const navigate = useNavigate();
  const [rawData, setRawData] = useState([]);
  const { open, setOpen } = usePopupStore()

  let pickedBanner = "month";
  let targetYear = new Date().getFullYear();
  let targetMonth = new Date().getMonth();

  useEffect(() => {

    if (!isAuthenticated) {
      props.onModal({
        message: "알림",
        description: "로그인을 해주세요"
      });
      navigate('/Login')

      return;
    }

    selectCalendarInfo(pickedBanner, targetYear, targetMonth + 1, userId)
      .then((res) => {
        let data = [...res.data.data].map((item) => {
          if (item.startDate) {
            item.startDate = new Date(item.startDate);
          }
          if (item.endDate) {
            item.endDate = new Date(item.endDate);
          }
          return item;
        });
        setRawData(data);
      }
      )
  }, [])

  const formatDate = (date) => {
    date = new Date(date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return parseInt(`${year}${month}${day}`)
  };

  const isDateInRange = (targetDate, startDate, endDate) => {
    return targetDate >= startDate && targetDate <= endDate;
  };
  const getListData = (value, rawData) => {

    const valueStr = formatDate(value)
    let listData = [];

    rawData.map((item, index) => {

      const startDateStr = formatDate(item.startDate);
      const endDateStr = formatDate(item.endDate);

      if (isDateInRange(valueStr, startDateStr, endDateStr)) {
        listData.push({ type: item.indexColor, content: item.title })
      }
    })

    return listData || [];
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, rawData);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {

    if (info.type === 'date') {
      pickedBanner = "month";
      return dateCellRender(current)
    };

    if (info.type === 'month') {
      pickedBanner = "year";
      return monthCellRender(current);
    }
    return info.originNode;
  };

  return <><Calendar cellRender={cellRender}

    onSelect={(item, type) => {

      targetYear = item.$y;
      targetMonth = item.$M;

      if (pickedBanner === "year") {

        if (type.source === "month") {
          setOpen(true);
        }

        if (type.source === "year") {
        }

      } else {
        if (type.source === "date") {
          setOpen(true);
        } else {

          if (type.source === "month") {
          }

          if (type.source === "year") {
          }
        }
      }

    }}

  />
    <Calendarpop type={pickedBanner}
      onClose={() => { setOpen(false) }}
      open={open}
      setOpen={setOpen}
    />
  </>
}