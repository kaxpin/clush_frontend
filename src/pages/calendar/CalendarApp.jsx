import { useNavigate } from 'react-router-dom';
import './index.css';
import { Badge, Calendar } from 'antd';
import { useEffect, useState } from 'react';
import Calendarpop from './components/CalendarAddpop';
import useAuthStore from '../../auth/auth';
import { selectCalendarInfo } from '../../api/CalendarApiService';
import usePopupStore from '../../store/popupStore';
import dayjs from 'dayjs';


export default function CalendarApp(props) {

  const { isAuthenticated, userId } = useAuthStore();
  const navigate = useNavigate();
  const [rawData, setRawData] = useState([]);
  const { open, setOpen } = usePopupStore()

  var today = new Date();
  const [isLoading, setIsLoading] = useState(false);
  const [pickedBanner, setPickedBanner] = useState('month');
  const [targetYear, setTargetYear] = useState(today.getFullYear());
  const [targetMonth, setTargetMonth] = useState(today.getMonth());
  const [targetDate, setTargetDate] = useState(today.getDate());
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {

    if (!isAuthenticated) {
      props.onModal({
        message: "알림",
        description: "로그인을 해주세요"
      });
      navigate('/Login')
      return;
    }

    fetchData(pickedBanner, targetYear, targetMonth);

  }, [refresh])

  //데이터 페칭
  async function fetchData(pickedBanner, targetYear, targetMonth) {

    console.log("##fetching start")

    setIsLoading(true);
    selectCalendarInfo(pickedBanner, targetYear, targetMonth + 1, userId)
      .then((res) => {
        let data = res.data.data.map((item) => {
          if (item.startDate) {
            item.startDate = new Date(item.startDate);
          }
          if (item.endDate) {
            item.endDate = new Date(item.endDate);
          }
          return item;
        });
        setRawData(data);
        setIsLoading(false);
      }
      )
  }

  ////cellRender-3 : 데이터 정보를 배열로 저장 
  const getDateData = (value, rawData) => {

    let listData = [];

    rawData.map((item, index) => {

      if (isDateInRange(formatDate(value), formatDate(item.start_date), formatDate(item.end_date))) {
        listData.push({ type: item.index_color, content: item.title })
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
        {listData.map((item, index) => (
          <li key={`${item.content}${index}`}>
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

  //[YYYY][MM] [Month/Year] 변경시   
  const onPanelChange = (value, type) => {

    if (type === 'month') {
      setTargetMonth(value.month());
      setTargetYear(value.year());
      if (today.getMonth() === value.month()) {
        setTargetDate(today.getDate());
      } else {
        setTargetDate(1);
      }
      setPickedBanner("month");
      fetchData(type, value.year(), value.month());
    };

    if (type === 'year') {
      setTargetYear(value.year());
      setPickedBanner("year");
    }

  }

  //캘린너 YYYY/MM select 변경 시
  const onSelect = (item, type) => {
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
      //type.source = select버튼 클릭했을때 그 select버튼 타입
      if (type.source === "date") {
        setOpen(true);
        setTargetDate(item.$D);
      }

    }

  }

  //util 함수
  function formatDate(timeStampStr) {
    const targetTime = new Date(timeStampStr)
    const year = targetTime.getFullYear()
    const month = String(targetTime.getMonth() + 1).padStart(2, '0')
    const date = String(targetTime.getDate()).padStart(2, '0')

    return parseInt(`${year}${month}${date}`)
  };

  function isDateInRange(targetTime, startDate, endDate) {
    return targetTime >= startDate && targetTime <= endDate;
  };

  return <>
    {isLoading ? <div> loading...</div> :
      // {
      <>
        <h1>{targetYear} {targetMonth} {targetDate}</h1>
        <Calendar
          key={refresh}
          value={dayjs().year(targetYear).month(targetMonth).date(targetDate)}
          onPanelChange={onPanelChange}
          cellRender={cellRender}
          onSelect={onSelect}
        />
      </>
    }

    <Calendarpop type={pickedBanner}
      onClose={() => { setOpen(false) }}
      open={open}
      setOpen={setOpen}
      setRefresh={setRefresh}
    />
  </>
}