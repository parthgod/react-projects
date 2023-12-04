import { useGlobalContext } from "../context";

const Favorites=()=>{

    const {favorites,selectMeal,removeFavorites}=useGlobalContext()

    return(
        <div className="favorites">
            <div className="favorites-content">
                <h5>Favorites</h5>
                <div className="favorites-container">
                    {favorites.map((fav)=>{
                        const {idMeal,strMealThumb:image}=fav;
                        return(
                            <div key={idMeal} className="favorite-item">
                                <img src={image} className="favorites-img img" onClick={()=>selectMeal(idMeal,true)}/>
                                <button className="remove-btn" onClick={()=>removeFavorites(idMeal)}>remove</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Favorites;