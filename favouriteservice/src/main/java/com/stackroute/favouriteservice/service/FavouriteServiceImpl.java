package com.stackroute.favouriteservice.service;

import com.stackroute.favouriteservice.Model.MatchResponse;
import com.stackroute.favouriteservice.dao.FavListDao;
import com.stackroute.favouriteservice.HttpUtils.HttpClient;
import com.stackroute.favouriteservice.dao.MatchDao;
import com.stackroute.favouriteservice.domain.MatchList;
import com.stackroute.favouriteservice.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavouriteServiceImpl implements FavouriteService {

    @Autowired
    private FavListDao favListDao;

    @Autowired
    private MatchDao matchDao;

    @Autowired
    private HttpClient httpClient;

    //Get Current Match List
    @Override
    public List<MatchList> getCurrentMatches() {
        List<MatchList> matchList = new ArrayList<>();
        try {
            matchList = matchDao.getCurrentMatches();
            if (matchList.size() == 0){
                MatchResponse matchData = httpClient.getCurrentMatchList();
                matchList = matchDao.storeMatchData(matchData);
            }
        } catch (Exception e){
            e.printStackTrace();

        }
        return matchList;
    }

    /**
     * Desc: To get the match object from database for given matchid
     *
     * @param id - match id
     * @return match object
     */
    @Override
    public MatchList getMatchDetails(Long id) throws MatchNotFoundException{

        return matchDao.getMatchWithId(id);
    }


    @Override
    public MatchList addMatchToFavList(String userID,Long id) throws MatchNotFoundException {

        return favListDao.addMatchToFavList(id, userID);
    }


    /**
     * Desc: To remove the Matches in user list database
     *
     * @param id - match id
     * @param userID - user id
     * @return match - match object
     */
    @Override
    public String removeFromFavList(String userID, Long id) throws MatchNotFoundException {

        return favListDao.removeFromFavList(id, userID);
    }



    /**
     * Desc: To get all the Matches in user list database
     *
     * @param userID - user id
     * @return Match list
     */
    @Override
    public List<MatchList> getAllFavListOfUser(String userID) throws MatchNotFoundException {

        return favListDao.getAllFavListOfUser(userID);
    }
}
