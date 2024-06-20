export default function BusinessInList(props){
const {name,rating,opinion}=props;
    return(<>
           <div>
            <h3>{business.businessesName}</h3>
            <p>Rating: {business.averageRating}</p>
            <p>NumberOfOpinions: {business.NumberOfOpinions}</p>
            <hr />
        </div>
    </>)
}

