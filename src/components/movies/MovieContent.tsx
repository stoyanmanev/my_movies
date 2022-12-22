import { Row, Col, Image } from "antd";
import React, { useEffect, useState } from "react";
import MoviesStore from "../../store/MoviesStore";
import ItemNotFound from "../UI/ItemNotFound";
import MovieContentType from "../../models/movie.content";

type Props = {
  id: string;
};

const MovieContent: React.FC<Props> = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [movie, setMovie] = useState<MovieContentType>();

  useEffect(() => {
    const loadMovieCtx = async () => {
      try {
        const movieAwait: MovieContentType | undefined =
          await MoviesStore.loadMovieContent(props.id);
        setMovie(movieAwait);
      } catch (error) {
        setError("Something went wrong");
      }
    };
    loadMovieCtx();
  }, [props.id]);

  return (
    <Row>
      <Col span={24}>
        {error && <ItemNotFound title={error} />}
        {!error && movie && (
          <>
            <Row style={{marginBottom: 26}}>
              <Col span={24}>
                <iframe
                  src={`${movie.trailer}?autoplay=1`}
                  style={{ aspectRatio: "16/9", width: "100%", border: 0 }}
                  title={movie.title}
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
            <Row gutter={26}>
              <Col span={8}>
                <Image src={movie.image}/>
              </Col>
              <Col span={16}>
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                <Row gutter={8}>
                  {movie.genre.map(genre => (
                    <Col><span style={{ backgroundColor: '#ad241b', padding: '0.5rem 0.8rem', borderRadius: '0.4rem' }}>{genre}</span></Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default MovieContent;
