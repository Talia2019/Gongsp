import { useEffect, useState } from "react";
import CategorySelect from "../categorySelect";
import axios from "axios";

export default function EditMeeting({ setWantEdit, setIsExist }) {
  const [myMeeting, setMyMeeting] = useState();
  const [meetingSeq, setMeetingSeq] = useState();
  const [category, setCategory] = useState();
  const [meetingTitle, setMeetingTitle] = useState();
  const [meetingDesc, setMeetingDesc] = useState();

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
        setCategory(() => response.data.meetingInfo.categoryseq);
        setMeetingTitle(() => response.data.meetingInfo.meetingTitle);
        setMeetingDesc(() => response.data.meetingInfo.meetingDesc);
      });
  };
  useEffect(() => {
    getMyMeeting();
  }, []);
  const onSaveChange = async () => {
    var data = new FormData();
    data.append("meetingSeq", meetingSeq);
    data.append("categorySeq", category);
    data.append("meetingTitle", meetingTitle);
    data.append("meetingDesc", meetingDesc);
    data.append("meetingCamType", 0);
    data.append("meetingMicType", 0);
    await axios
      .patch(
        process.env.REACT_APP_SERVER_URL + `/users/meetings/${meetingSeq}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setWantEdit(() => false);
        setIsExist(() => true);
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
  return (
    <div className="setting-meeting-header">
      <div className="settings-meeting-heading">
        <div className="settings-meeting-heading__h1">??? ???????????????</div>
        <div className="settings-meeting-heading__h2">
          ?????? ?????? ?????????????????? ???????????? ??????????????????
        </div>
      </div>
      <table>
        <tbody>
          <tr className="create-meeting__table-row">
            <td className="create-meeting-row a1">????????????</td>
            <td className="create-meeting-row a2">
              {setCategory && <CategorySelect categoryseq={setCategory} />}
            </td>
          </tr>
          <tr>
            <td className="create-meeting-row a1">??????????????? ??????</td>
            <td className="create-meeting-row a2">
              <input
                type="text"
                defaultValue={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="??????????????? ????????? ???????????????"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="create-meeting-desc">
        <div className="create-meeting-row a1 meeting-desc">
          ??????????????? ??????
        </div>
        <textarea
          type="text"
          defaultValue={meetingDesc}
          onChange={(e) => setMeetingDesc(e.target.value)}
          placeholder="??? ?????????????????? ?????? ???????????? ??????????????????"
        ></textarea>
      </div>
      <center>
        <button className="create-meeting-btn" onClick={onSaveChange}>
          ?????? ????????????
        </button>
        {/* <button className="create-meeting-btn-delete" onClick={onDelete}>
          ??????
        </button> */}
        {/* <button className="create-meeting-btn" onClick={onCreateMeeting}>
          ??????????????? ??????
        </button> */}
      </center>
      {/* <div>????????? ??????</div>
      {myMeeting && (
        <div>
          <div>
            ??????????????? ????????????: <CategorySelect categoryseq={setCategory} />
          </div>
          <div>
            ??????????????? ??????:{" "}
            <input
              defaultValue={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            ></input>
          </div>
          <div>
            ????????? ??????:{" "}
            <textarea
              defaultValue={meetingDesc}
              onChange={(e) => setMeetingDesc(e.target.value)}
            />
          </div>
        </div>
      )}
      <button onClick={onSaveChange}>??????</button>
      <button onClick={onDelete}>??????</button> */}
    </div>
  );
}
