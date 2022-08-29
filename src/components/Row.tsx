import axios from "axios";
import { useState, useEffect } from "react";
import { MovieType } from "./Main";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import Movie from "./Movie";

interface RowData {
  title: string;
  fetchURL: string;
  rowID: string;
}

const Row = (rowProps: RowData) => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    axios.get(rowProps.fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [rowProps.fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowProps.rowID);
    if (slider != null) {
      //   console.log(slider);
      //   console.log(rowProps.rowID);
      //   console.log(slider.scrollLeft);
      //   console.log(slider.scrollLeft - 500);

      slider.scrollLeft = slider.scrollLeft - 500;
      //   console.log(slider);
    }
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowProps.rowID);
    if (slider != null) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{rowProps.title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowProps.rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => {
            return <Movie key={id} item={item} />;
          })}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
