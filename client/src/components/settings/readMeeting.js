import { useEffect, useState } from "react";
import axios from "axios";

export default function ReadMeeting({ setWantEdit, setIsExist }) {
  const [myMeeting, setMyMeeting] = useState();
  const [meetingSeq, setMeetingSeq] = useState();
  const toEdit = () => {
    setWantEdit(() => true);
  };
  const getMyMeeting = async () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/users/meetings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setMyMeeting(() => response.data.meetingInfo);
        setMeetingSeq(() => response.data.meetingInfo.meetingSeq);
      });
  };
  const onDelete = async () => {
    await axios
      .delete(
        process.env.REACT_APP_SERVER_URL + `/users/meetings/${meetingSeq}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setWantEdit(() => false);
        setIsExist(() => false);
      });
  };
  useEffect(() => {
    getMyMeeting();
  }, []);
  return (
    <div className="setting-meeting-header">
      <div className="settings-meeting-heading">
        <div className="settings-meeting-heading__h1">내 자유열람실</div>
        <div className="settings-meeting-heading__h2">
          내가 만든 자유열람실을 확인하고 관리해보세요
        </div>
      </div>

      {myMeeting && (
        <div>
          <div className="read-meeting__header">
            <div className="read-meeting__category">
              {myMeeting.category.categoryName}
            </div>
            <div className="read-meeting__title">{myMeeting.meetingTitle}</div>
          </div>
          <div className="read-meeting__headcount">
            <svg
              width="13"
              height="13"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 7.5C8.44483 7.5 9.35097 7.12467 10.0191 6.45657C10.6872 5.78847 11.0625 4.88233 11.0625 3.9375C11.0625 2.99267 10.6872 2.08653 10.0191 1.41843C9.35097 0.750334 8.44483 0.375 7.5 0.375C6.55517 0.375 5.64903 0.750334 4.98093 1.41843C4.31283 2.08653 3.9375 2.99267 3.9375 3.9375C3.9375 4.88233 4.31283 5.78847 4.98093 6.45657C5.64903 7.12467 6.55517 7.5 7.5 7.5V7.5ZM9.875 3.9375C9.875 4.56739 9.62478 5.17148 9.17938 5.61688C8.73398 6.06228 8.12989 6.3125 7.5 6.3125C6.87011 6.3125 6.26602 6.06228 5.82062 5.61688C5.37522 5.17148 5.125 4.56739 5.125 3.9375C5.125 3.30761 5.37522 2.70352 5.82062 2.25812C6.26602 1.81272 6.87011 1.5625 7.5 1.5625C8.12989 1.5625 8.73398 1.81272 9.17938 2.25812C9.62478 2.70352 9.875 3.30761 9.875 3.9375V3.9375ZM14.625 13.4375C14.625 14.625 13.4375 14.625 13.4375 14.625H1.5625C1.5625 14.625 0.375 14.625 0.375 13.4375C0.375 12.25 1.5625 8.6875 7.5 8.6875C13.4375 8.6875 14.625 12.25 14.625 13.4375ZM13.4375 13.4328C13.4363 13.1406 13.2546 12.2619 12.4495 11.4567C11.6753 10.6825 10.2182 9.875 7.5 9.875C4.78063 9.875 3.32475 10.6825 2.5505 11.4567C1.74538 12.2619 1.56488 13.1406 1.5625 13.4328H13.4375Z"
                fill="var(--textColor-todo)"
              />
            </svg>
            {myMeeting.meetingHeadcount}
          </div>
          <div className="read-meeting__desc">{myMeeting.meetingDesc}</div>
        </div>
      )}
      <div className="setting-meeting-btns">
        <button className="create-meeting-btn" onClick={toEdit}>
          수정
        </button>
        <button className="create-meeting-btn-delete" onClick={onDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}
