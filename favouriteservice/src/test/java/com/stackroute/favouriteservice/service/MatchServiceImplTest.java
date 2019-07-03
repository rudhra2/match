package com.stackroute.favouriteservice.service;


        import static org.junit.Assert.assertEquals;
        import static org.mockito.BDDMockito.given;
        import static org.mockito.Mockito.when;

        import java.util.ArrayList;
        import java.util.Date;
        import java.util.List;

        import org.junit.Before;
        import org.junit.Test;
        import org.mockito.InjectMocks;
        import org.mockito.Mock;
        import org.mockito.Mockito;
        import org.mockito.MockitoAnnotations;

        import com.stackroute.favouriteservice.HttpUtils.HttpClient;
        import com.stackroute.favouriteservice.dao.MatchDao;
        import com.stackroute.favouriteservice.dao.FavListDao;
        import com.stackroute.favouriteservice.domain.MatchList;
        import com.stackroute.favouriteservice.domain.FavList;

public class MatchServiceImplTest {

    @Mock
    private MatchDao matchDao;

    @Mock
    private FavListDao favListDao;

    @Mock
    private HttpClient httpClient;

    private transient MatchList matchList;

    private transient FavList favList;

    @InjectMocks
    private FavouriteServiceImpl favouriteServiceImpl;

    @Before
    public void setupMock() {
        MockitoAnnotations.initMocks(this);
        long matchID = 1144512;
        long favListID = 1144512;
        long id = 123;
        this.matchList = new MatchList(id, matchID, "date", "dateTimeGMT", "team_1", "team_2", "type","squad", "toss_winner_team","winner_team","matchStarted");
            this.favList = new FavList(favListID, "UserID", matchID);
    }

    @Test
    public void getParticularMatch() throws Exception {
        long matchID = 1144512;
        when(matchDao.getMatchWithId(matchID)).thenReturn(matchList);
        MatchList tempMatch = favouriteServiceImpl.getMatchDetails(matchID);
        assertEquals(matchList.getMatchId(), tempMatch.getMatchId());
    }

    @Test
    public void getMatchList() throws Exception {
        List<MatchList> matchArray = new ArrayList<MatchList>();
        matchArray.add(matchList);
        when(matchDao.getCurrentMatches()).thenReturn(matchArray);
        List<MatchList> tempMatch = favouriteServiceImpl.getCurrentMatches();
        assertEquals(matchArray.size(), tempMatch.size());
    }


}

