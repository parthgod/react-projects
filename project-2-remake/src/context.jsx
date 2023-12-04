import React,{useContext, useEffect,useState} from "react";
import axios from 'axios'

const AppContext=React.createContext();

const allMealsURL='https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealURL='https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider=({children})=>{

    const [meals,setMeals]=useState([]);
    const [loading,setLoading]=useState(false);
    const [searhTerm,setSearchTerm]=useState('')
    const [showModal,setShowModal]=useState(false)
    const [selectedMeal,setSelectedMeal]=useState(null)
    const [favorites,setFavorites]=useState(JSON.parse(localStorage.getItem("fav"))|| [])

    const fetchMeals=async(url)=>{
        setLoading(true);
        try{
            const {data}=await axios(url);
            if(data.meals)
            setMeals(data.meals);
            else
            setMeals([]);
        }catch(error){
            console.log(error.response);
        }
        setLoading(false);
    }

    const fetchRandomMeal=()=>{
        fetchMeals(randomMealURL);
    }

    const selectMeal=(idMeal,favoriteMeal)=>{
        let meal;
        if(favoriteMeal)
        meal=favorites.find((meal)=>meal.idMeal===idMeal)
        else
        meal=meals.find((meal)=>meal.idMeal===idMeal)
        setSelectedMeal(meal);
        setShowModal(true)
    }

    const closeModal=()=>{
        setShowModal(false)
    }

    const addToFavorites=(idMeal)=>{
        const alreadyFav=favorites.find((meal)=>meal.idMeal===idMeal)
        if(alreadyFav)
        return
        const meal=meals.find((meal)=>meal.idMeal===idMeal)
        const fav=[...favorites,meal]
        setFavorites(fav)
        localStorage.setItem("fav",JSON.stringify(fav))
    }

    const removeFavorites=(idMeal)=>{
        const fav=favorites.filter((meal)=>meal.idMeal!=idMeal)
        setFavorites(fav);
        localStorage.setItem("fav",JSON.stringify(fav))
    }

    useEffect(()=>{
        fetchMeals(allMealsURL);
    },[])   

    useEffect(()=>{
        if(!searhTerm) return
        fetchMeals(`${allMealsURL}${searhTerm}`);
    },[searhTerm])

    return(
        <AppContext.Provider value={{loading,meals,setSearchTerm,fetchRandomMeal,showModal,selectedMeal,selectMeal,closeModal,addToFavorites,removeFavorites,favorites}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(AppContext);
}

export {AppContext, AppProvider};