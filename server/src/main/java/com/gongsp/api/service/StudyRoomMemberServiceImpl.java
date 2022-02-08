package com.gongsp.api.service;

import com.gongsp.db.entity.StudyRoomMember;
import com.gongsp.db.entity.StudyRoomMemberId;
import com.gongsp.db.repository.StudyRoomMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("studyMemberService")
public class StudyRoomMemberServiceImpl implements StudyRoomMemberService {

    @Autowired
    StudyRoomMemberRepository studyRoomMemberRepository;

    @Override
    public boolean existsMember(int userSeq, int studySeq) {
        return studyRoomMemberRepository.existsByStudyRoomMemberId(new StudyRoomMemberId(userSeq, studySeq));
    }

    @Override
    public Optional<StudyRoomMember> getStudyMember(Integer userSeq, Integer studySeq) {
        return studyRoomMemberRepository.findStudyRoomMemberByStudyRoomMemberId(new StudyRoomMemberId(userSeq, studySeq));
    }

    @Override
    public void banMember(Integer userSeq, Integer studySeq) {
        int banCnt = getStudyMember(userSeq, studySeq).get().getMemberEjectCount();
        studyRoomMemberRepository.save(new StudyRoomMember(new StudyRoomMemberId(userSeq, studySeq), banCnt + 1, false));
    }

    @Override
    public void updateMemberOnair(Integer userSeq, Integer studySeq, boolean isOnair) {
        Optional<StudyRoomMember> opStudyMember = getStudyMember(userSeq, studySeq);
        if (!opStudyMember.isPresent())
            return;
        StudyRoomMember studyMember = opStudyMember.get();
        studyMember.setIsMemberOnAir(isOnair);
        studyRoomMemberRepository.save(studyMember);
    }

    @Override
    public int getStudyOnairCnt(Integer studySeq) {
        return studyRoomMemberRepository.countStudyRoomMemberByStudySeqAndOnair(studySeq);
    }
}
