import {Link} from 'react-router-dom'
export default function BusinessInList({business}){
    return(<Link>
           <div>
           <p>{business.businessesName}</p>
           <p>Rating: {business.averageRating}</p>
            <p>NumberOfOpinions: {business.NumberOfOpinions}</p>
            <hr />
        </div>
    </Link>)
}


