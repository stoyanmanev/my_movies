import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { Card, Col, Result, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { observer } from "mobx-react";
import MoviesStore from "../../store/MoviesStore";
import MoviesPagination from "./MoviesPagination";

const Movies: React.FC = () => {
  const loadingCards = [1, 2, 3, 4];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageOptions, setPageOptions] = useState<{ from: number; to: number }>({
    from: MoviesStore.moviesCurrentPaginationPage === 1 ? 0 : MoviesStore.moviesCurrentPaginationPage,
    to: MoviesStore.moviesCurrentPaginationSize * MoviesStore.moviesCurrentPaginationPage,
  });

  useEffect(() => {
    setIsLoading(true);

    const loadMoviesCtx = async () => {
      const moviesSet = await MoviesStore.loadMovies();
      if (moviesSet.isSuccess) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    loadMoviesCtx();
  }, []);

  return (
    <section className="movies">
      <Row gutter={26}>
        {isLoading &&
          loadingCards.map((i) => (
            <Col key={i} span={6}>
              <Card
                bordered={false}
                style={{ marginBottom: 36, minHeight: 325 }}
                loading={isLoading}
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          ))}
        {MoviesStore.moviesList.length > 0 &&
          !isLoading &&
          MoviesStore.moviesList.map((movie, i) => {
            if (i >= pageOptions.from && i < pageOptions.to) {
              return (
                <Col key={movie.id} span={6}>
                  <MovieItem
                    id={movie.id}
                    name={movie.name}
                    imagePath={movie.imagePath}
                  />
                </Col>
              );
            } else {
              return false;
            }
          })}
        {MoviesStore.moviesList.length === 0 && !isLoading && (
          <Col span={24}>
            <Card bordered={false} style={{ marginBottom: 26 }}>
              <Result
                status="404"
                title={"No discovered films"}
                subTitle="Please contact to support"
              ></Result>
            </Card>
          </Col>
        )}
      </Row>
      <Row gutter={26}>
        <Col span={24}>
          <MoviesPagination
            pageOptions={pageOptions}
            setPageOptions={setPageOptions}
            total={MoviesStore.moviesCount}
          />
        </Col>
      </Row>
    </section>
  );
};

export default observer(Movies);
