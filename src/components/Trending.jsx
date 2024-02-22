import { useEffect, useRef, useState } from "react";
import { TRENDING_API } from "../utils/constants";
import { POSTER_PATH_URL } from "../utils/constants";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
const Trending = () => {
  const elementRef = useRef();
  const [movies, setMovies] = useState();
  useEffect(() => {
    trendingMovies();
  }, []);
  const screenWidth = window.screen.width;
  const trendingMovies = async () => {
    const moviesData = await fetch(TRENDING_API);
    const jsonData = await moviesData.json();
    console.log(jsonData?.results);
    setMovies(jsonData?.results);
  };
  const scrollLeft = (element) => {
    console.log(element);
    element.scrollLeft -= (10 / 12) * screenWidth;
  };
  const scrollRight = (element) => {
    console.log(element);
    element.scrollLeft += (10 / 12) * screenWidth;
  };
  if (movies?.length === 0) {
    return;
  }
  return (
    <>
      <section className=" w-10/12 mx-auto relative my-10">
        <article className="hidden lg:block lg:absolute top-1/2 left-4">
          <FaLessThan
            className="text-white w-10 h-10 p-2 rounded-full hover:cursor-pointer font-extrabold z-50"
            style={{ position: "absolute" }}
            onClick={() => scrollLeft(elementRef.current)}
          />
        </article>
        <section
          className="flex flex-row w-full overflow-hidden  scrollbar-hide scroll-smooth transition-all duration-300 ease-in-out gap-7"
          ref={elementRef}
        >
          {movies?.map((movie) => (
            <img
              className="min-w-full md:h-[300px] object-fill  rounded-lg shadow-xl brightness-50 hover:brightness-90 hover:border-2 border-white hover:shadow-xl bg-blend-darken"
              key={movie?.id}
              src={POSTER_PATH_URL + movie?.backdrop_path}
              alt="Trending-Banner-Image"
            />
          ))}
        </section>
        <article className="hidden lg:block  lg:absolute top-1/2 right-12">
          <FaGreaterThan
            className="text-white w-10 h-10 p-2 rounded-full hover:cursor-pointer z-50 font-extrabold"
            style={{ position: "absolute" }}
            onClick={() => scrollRight(elementRef.current)}
          />
        </article>
      </section>
    </>
  );
};
export default Trending;
