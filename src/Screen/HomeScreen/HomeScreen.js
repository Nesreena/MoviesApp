import {
  FlexColumn,
  InnerSection,
  SpinnerContainer,
} from "../../Global.Styles";
import {
  CardsContainer,
  Description,
  HeroSection,
  InnerHeroSection,
  LoadMore,
  MoviesTitle,
  Title,
} from "./HomeScreen.Styles";
import Card from "../../Components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMovie } from "../../Redux/movieAction.js";

function HomeScreen(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(getMovie(pageNumber));
  }, [dispatch, pageNumber]);

  return state.movieData.isLoading ? (
    <SpinnerContainer />
  ) : (
    <FlexColumn>
      <HeroSection
        img={"http://image.tmdb.org/t/p/w1280/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg"}
      >
        <InnerHeroSection>
          <Title></Title>
          <Description> </Description>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle></MoviesTitle>
        <CardsContainer>
          {state.movieData.movies.map((page) =>
            page.map((item) => (
              <Card
                Key={item.id}
                id={item.id}
                name={item.title}
                img={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
              />
            ))
          )}
        </CardsContainer>
        <LoadMore
          isLoading={false}
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          Load more...
        </LoadMore>
      </InnerSection>
    </FlexColumn>
  );
}

export default HomeScreen;
