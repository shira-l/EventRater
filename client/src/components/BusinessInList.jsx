export default function BusinessInList({business}){
    return(<>
           <div>
           <p>{business.businessesName}</p>
           <p>Rating: {business.averageRating}</p>
            <p>NumberOfOpinions: {business.NumberOfOpinions}</p>
            <hr />
        </div>
    </>)
}


