import React from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { useParams } from "react-router-dom";
import MovieInfo from '../components/MovieInfo';
import Footer from '../components/Footer';

function MoviePage() {
  const { movieId } = useParams();

  return (
    <>
      <NavBar />
      <div className="page-background">
        <div className="container-fluid mt-1 ">
          <MovieInfo id={movieId} />
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default MoviePage;
