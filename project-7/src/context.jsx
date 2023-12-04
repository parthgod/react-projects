import React, { useContext, useEffect, useState } from "react";
import { useGetGenresQuery } from "./redux/services/moviesApi";
import { json } from "react-router-dom";

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const savedFavs = localStorage.getItem('favourites');
    const initialFavs = savedFavs ? JSON.parse(savedFavs) : [];
    const [favs, setFavs] = useState(initialFavs);
    const [isFav, setIsFav] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Movies');
    const [genres, setGenres] = useState('');
    const [year, setYear] = useState('');
    const [yearData, setYearData] = useState([]);

    const { data: genreDataAPI } = useGetGenresQuery();

    useEffect(() => {
        if (genreDataAPI) {
            let years = [];
            for (let i = 0, j = 2021; j >= 2000; j--, i++) {
                years[i] = j;
            }
            setYearData(years);
            setYear(years[0]);
            setGenres(genreDataAPI?.results?.[0]?.genre);
        }
    }, [genreDataAPI, selectedCategory]);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favs));
    }, [favs]);

    return (
        <AppContext.Provider value={{ favs, setFavs, isFav, setIsFav, selectedCategory, setSelectedCategory, genreDataAPI, genres, setGenres, year, setYear, yearData, setYearData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };