import { useGlobalContext } from "../context";
import {BsHandThumbsUp} from 'react-icons/bs';

const Meals=()=>{

    const {meals,loading,selectMeal,addToFavorites}=useGlobalContext();

    if(loading){
        return(
            <div className="section">
                <h4>Loading...</h4>
            </div>
        )
    }

    if(meals.length<1){
        return(
            <div className="section">
                <h4>No meals matched your search term. Please try again.</h4>
            </div>
        )
    }

    return(
        <div className="section-center">
            {meals.map((singleMeal)=>{
                const {idMeal, strMeal:title, strMealThumb:image}=singleMeal
                return(
                    <div key={idMeal} className="single-meal">
                        <img src={image} className="img" onClick={()=>selectMeal(idMeal)}/>
                        <footer>
                            <h5>{title}</h5>
                            <button className="like-btn" onClick={()=>addToFavorites(idMeal)}><BsHandThumbsUp/></button>
                        </footer>
                    </div>
                )
            })}
        </div>
    )
}

export default Meals;