import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import isLogin from "../utils/isLogin";
import "../statics/css/studyRecruitDetail.css";

export default function StudyRecruitDetail() {
  const TOKEN = localStorage.getItem("accessToken");
  const { studyseq } = useParams();
  const [data, setData] = useState([]);
  const [todayDate, setTodayDate] = useState(new Date());

  function changeDateFormat() {
    if (setTodayDate === null) {
      console.log("no date");
    }
    return (
      todayDate.getFullYear() +
      "-" +
      (todayDate.getMonth() + 1 > 9
        ? (todayDate.getMonth() + 1).toString()
        : "0" + (todayDate.getMonth() + 1)) +
      "-" +
      (todayDate.getDate() > 9
        ? todayDate.getDate().toString()
        : "0" + todayDate.getDate().toString())
    );
  }

  useEffect(() => {
    if (isLogin) {
      axios
        .get("/studies/" + studyseq, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          const apidata = res.data;
          setData((prevState) => ({
            ...prevState,
            apidata,
          }));
        });
    }
  }, [TOKEN, studyseq]);

  const numberToDay = (num) => {
    if (num === 1) {
      return "월";
    }
    if (num === 2) {
      return "화";
    }
    if (num === 3) {
      return "수";
    }
    if (num === 4) {
      return "목";
    }
    if (num === 5) {
      return "금";
    }
    if (num === 6) {
      return "토";
    }
    if (num === 7) {
      return "일";
    }
  };
  // console.log(data.apidata.day);
  return (
    <div className="studyrecruit-detail">
      <div className="studyrecruit-detail-box">
        <div>
          <div className="studyrecruit-detail-box-heading__first">
            {data.apidata && (
              <div className="studyrecruit-detail-box-heading__title">
                {data.apidata.studyTitle}
              </div>
            )}
            {data.apidata && (
              <div className="studyrecruit-detail-box-heading__category">
                {data.apidata.categoryName}
              </div>
            )}
          </div>
          <div className="studyrecruit-detail-box-heading__second">
            <div className="studyrecruit-detail-box-heading__profileImage"></div>
            {data.apidata && (
              <div className="studyrecruit-detail-box-heading__nickname">
                {data.apidata.hostNickName}
              </div>
            )}
          </div>
          <hr></hr>
          <div className="studyrecruit-detail-box-body">
            <div className="studyrecruit-detail-box-body__time">
              <table>
                <tbody>
                  <tr className="studyrecruit-detail-box-body__row">
                    <td className="studyrecruit-detail-box-body__title">
                      스터디 일정
                    </td>
                    {data.apidata &&
                      data.apidata.day.map((days) => (
                        <td key={days.dayNumber}>
                          <div className="studyrecruit-detail-box-body__days">
                            <div className="studyrecruit-detail-box-body__day name">
                              {numberToDay(days.dayNumber)}
                            </div>
                            <div className="studyrecruit-detail-box-body__day timestart">
                              {days.timeStart.slice(0, 5)} ~{" "}
                            </div>
                            <div className="studyrecruit-detail-box-body__day timeend">
                              {days.timeEnd.slice(0, 5)}
                            </div>
                          </div>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr className="studyrecruit-detail-box-body__row">
                    <td className="studyrecruit-detail-box-body__title">
                      모집 기간
                    </td>
                    {data.apidata && (
                      <td className="studyrecruit-detail-box-body__enddate">
                        {changeDateFormat()} ~ {data.apidata.studyRecruitEnd}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            {data.apidata && (
              <div className="studyrecruit-detail-box-body__shortdesc">
                {data.apidata.studyShortDesc}
              </div>
            )}
            {data.apidata && (
              <div className="studyrecruit-detail-box-body__desc">
                {data.apidata.studyDesc}
              </div>
            )}
          </div>
        </div>
        <center>
          <div className="studyrecruit-detail-box-footer">
            <button className="studyrecruit-detail-box-footer__btn">
              스터디 신청
            </button>
          </div>
        </center>
      </div>
    </div>
  );
}
