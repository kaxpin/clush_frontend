import { useNavigate } from 'react-router-dom';
import './index.css';
import { Badge, Calendar } from 'antd';
import { useEffect, useState } from 'react';
import Calendarpop from './components/CalendarAddpop';
import useAuthStore from '../../auth/auth';
import { selectCalendarInfo } from '../../api/CalendarApiService';
import usePopupStore from '../../store/popupStore';


export default function CalendarApp(props) {

  const { isAuthenticated, userId, login, logout } = useAuthStore();
  const navigate = useNavigate();
  const [rawData, setRawData] = useState([]);
  const { open, setOpen } = usePopupStore()

  const today = new Date();
  const [pickedBanner, setPickedBanner] = useState('month');
  const [targetYear, setTargetYear] = useState(today.getFullYear());
  const [targetMonth, setTargetMonth] = useState(today.getMonth());

  useEffect(() => {

    if (!isAuthenticated) {
      props.onModal({
        message: "알림",
        description: "로그인을 해주세요"
      });
      navigate('/Login')
      return;
    }

    fetchData();

  }, [pickedBanner, targetYear, targetMonth])

  //데이터 페칭
  function fetchData() {

    console.log("##fetching start")
    console.log(pickedBanner, targetYear, targetMonth + 1, userId)


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
  }


  ////cellRender-3 : 데이터 정보를 배열로 저장 
  const getDateData = (value, rawData) => {

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

  //cellRender-2 배열형태의 데이터를 캘린더에 표시
  const dateCellRender = (value) => {
    const listData = getDateData(value, rawData);
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

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };


  //cellRender-1(캘린더 전환시 호출되는 순)
  const cellRender = (current, info) => {

    if (info.type === 'date') {
      return dateCellRender(current)
    };

    if (info.type === 'month') {
      return monthCellRender(current);
    }
    return info.originNode;
  };

  //캘린더 전환즉시 호출
  const onPanelChange = (value, type) => {
    console.log("onPanelChange", value, type);

    if (type == 'month') {
      setTargetMonth(value.month());
      setTargetYear(value.year());
      setPickedBanner("month");
    };

    if (type == 'year') {
      setTargetYear(value.year());
      setPickedBanner("year");
    }
  }
  //util 함수
  function formatDate(date) {
    date = new Date(date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return parseInt(`${year}${month}${day}`)
  };

  function isDateInRange(targetDate, startDate, endDate) {
    return targetDate >= startDate && targetDate <= endDate;
  };


  return <>
    <Calendar
      onPanelChange={onPanelChange}
      cellRender={cellRender}
      onSelect={(item, type) => {
        //아래 변수는 일단 보류
        // targetYear = item.$y;
        // targetMonth = item.$M;

        //banner => 'Year'선택
        if (pickedBanner === "year") {

          if (type.source === "month") {
            setOpen(true);
          }

          if (type.source === "year") {
          }

          //banner => 'Month'선택
        } else {

          //날짜(셀) 클릭시  
          if (type.source === "date") setOpen(true);

          if (type.source === "month") {
          }

          if (type.source === "year") {
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