import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../statics/css/home/dailyStats.css";

export default function DailyStats(props) {
  const [date, setDate] = useState("");
  const [nodata, setNodata] = useState("");
  const [dayTotal, setDayTotal] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (props.selectedDay) {
      axios
        .get("/stats?date=" + props.selectedDay, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          // console.log(res);
          setDate(() => props.selectedDay.split("-"));
          if (res.data.statusCode === 200) {
            const RESULT = res.data.result;
            setDayTotal(RESULT.dayTotalStudyTime);
            setMeetingTime(RESULT.meetingRoomTime);
            setStudyTime(RESULT.studyRoomTime);
            setStartTime(RESULT.studyStartTime);
            setEndTime(RESULT.studyEndTime);
            setTotal(RESULT.userTotalStudyTime);
            setNodata(false);
          } else if (res.data.statusCode === 404) {
            setNodata(true);
          }
        });
    } else {
      axios
        .get("/stats?date=" + JSON.parse(props.defaultDay), {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          // console.log(res);
          setDate(() => JSON.parse(props.defaultDay).split("-"));
          if (res.data.statusCode === 200) {
            const RESULT = res.data.result;
            setDayTotal(RESULT.dayTotalStudyTime);
            setMeetingTime(RESULT.meetingRoomTime);
            setStudyTime(RESULT.studyRoomTime);
            setStartTime(RESULT.studyStartTime);
            setEndTime(RESULT.studyEndTime);
            setTotal(RESULT.userTotalStudyTime);
            setNodata(false);
          } else if (res.data.statusCode === 404) {
            setNodata(true);
          }
        });
    }
  }, [props.selectedDay]);

  return (
    <div className="daily-stats">
      <div className="daily-stats-header">
        {date[0]}??? {date[1]}??? {date[2]}???
      </div>
      {!nodata && (
        <div className="daily-stats-body">
          <div>
            <div className="daily-stats-body__header">?????? ?????? ??????</div>
            <div className="daily-stats-body__contents">
              {parseInt(dayTotal / 60)}??????{" "}
              {dayTotal - parseInt(dayTotal / 60) * 60}???
            </div>
          </div>
          <div>
            <div className="daily-stats-body__header">????????????</div>
            <div className="daily-stats-body__contents">{startTime}</div>
          </div>
          <div>
            <div className="daily-stats-body__header">???????????? ????????????</div>
            <div className="daily-stats-body__contents">
              {parseInt(studyTime / 60)}??????{" "}
              {studyTime - parseInt(studyTime / 60) * 60}???
            </div>
          </div>
          <div>
            <div className="daily-stats-body__header">?????? ?????? ??????</div>
            <div className="daily-stats-body__contents">
              {parseInt(total / 60)}?????? {total - parseInt(total / 60) * 60}???
            </div>
          </div>
          <div>
            <div className="daily-stats-body__header">????????????</div>
            <div className="daily-stats-body__contents">{endTime}</div>
          </div>
          <div>
            <div className="daily-stats-body__header">????????? ????????????</div>
            <div className="daily-stats-body__contents">
              {parseInt(meetingTime / 60)}??????{" "}
              {meetingTime - parseInt(meetingTime / 60) * 60}???
            </div>
          </div>
        </div>
      )}
      {nodata && (
        <div className="no-data">?????? ????????? ????????? ????????? ????????????</div>
      )}
    </div>
  );
}
