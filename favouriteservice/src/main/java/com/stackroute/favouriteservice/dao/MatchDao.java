package com.stackroute.favouriteservice.dao;

import com.stackroute.favouriteservice.domain.MatchList;
import com.stackroute.favouriteservice.repository.MatchRepository;
import com.stackroute.favouriteservice.Model.MatchResponse;
import com.stackroute.favouriteservice.Model.Matches;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class MatchDao {

    @Autowired
    MatchRepository matchRepository;


    public List<MatchList> getCurrentMatches(){
        List<MatchList> matchList = matchRepository.findAll();
        return matchList;
    }

    public MatchList getMatchWithId(Long id) throws MatchNotFoundException{
       MatchList match =  matchRepository.findByMatchId(id);
        if(match != null) {
            return match;
        } else {
            throw new MatchNotFoundException("Data Not availabe for the matchid :" + id);
        }
    }

    public List<MatchList> storeMatchData(MatchResponse matchData){

        List<Matches> matches = matchData.getMatches();
        List<MatchList> addedMatch = new ArrayList<MatchList>();
        for(int i=0; i< matchData.getMatches().size(); i++){
            MatchList match = new MatchList();
            match.setMatchId(matches.get(i).getUnique_id());
            match.setDate(matches.get(i).getDate());
            match.setDateTimeGMT(matches.get(i).getDateTimeGMT());
            match.setTeam_1(matches.get(i).getTeam1());
            match.setTeam_2(matches.get(i).getTeam2());
            match.setType(matches.get(i).getType());
            match.setSquad(matches.get(i).getSquad());
            match.setToss_winner_team(matches.get(i).getToss_winner_team());
            match.setWinner_team(matches.get(i).getWinner_team());
            match.setMatchStarted(matches.get(i).getMatchStarted());
            addedMatch.add(matchRepository.save(match));
        }
        return addedMatch;
    }


}

