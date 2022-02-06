package com.gongsp.api.response.study;

import com.gongsp.api.response.meeting.MeetingEnterPostRes;
import com.gongsp.db.entity.Meeting;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class StudyEnterPostRes {    private String sessionToken;
    private Integer meetingSeq;
    private Boolean isHost;
    private String meetingTitle;
    private String meetingDesc;
    private Integer meetingCapacity;
    private Integer meetingHeadcount;
    private LocalDate meetingDate;      //시작날짜
    private LocalTime meetingStartTime; //시작시간

    public static MeetingEnterPostRes of(Integer statusCode, String message, String sessionToken) {
        MeetingEnterPostRes res = new MeetingEnterPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSessionToken(sessionToken);
        res.setMeetingDate(LocalDate.now());
        res.setMeetingStartTime(LocalTime.now());
        return res;
    }

    public static MeetingEnterPostRes of(Integer statusCode, String message, String sessionToken, Meeting meeting, Boolean isHost) {
        MeetingEnterPostRes res = new MeetingEnterPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSessionToken(sessionToken);
        res.setMeetingSeq(meeting.getMeetingSeq());
        res.setIsHost(isHost);
        res.setMeetingTitle(meeting.getMeetingTitle());
        res.setMeetingDesc(meeting.getMeetingDesc());
        res.setMeetingCapacity(meeting.getMeetingCapacity());
        res.setMeetingHeadcount(meeting.getMeetingHeadcount());
        return res;
    }
}
