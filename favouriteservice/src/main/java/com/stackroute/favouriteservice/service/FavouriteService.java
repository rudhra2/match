package com.stackroute.favouriteservice.service;


import com.stackroute.favouriteservice.domain.MatchList;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;


import java.util.List;

public interface FavouriteService {
    MatchList addMatchToFavList(String userID, Long id) throws MatchNotFoundException;

    String removeFromFavList(String userID, Long id) throws MatchNotFoundException;

    List<MatchList> getAllFavListOfUser(String userId) throws MatchNotFoundException;

    List<MatchList> getCurrentMatches();

    MatchList getMatchDetails(Long id) throws MatchNotFoundException;







}
