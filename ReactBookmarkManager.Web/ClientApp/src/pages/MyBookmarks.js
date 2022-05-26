import axios from "axios";
import React, {useState, useEffect} from "react";
import { useAuthContext } from "../AuthContext";
import BookmarkRow from "../BookmarkRow";
import { Link } from "react-router-dom";

const MyBookmarks = () =>{
const [myBookmarks, setMyBookmarks] = useState();
const {user} = useAuthContext();

useEffect(() =>{
  getBookmarks();
}, []);
const getBookmarks = async() => {
    const {data} = await axios.get('api/bookmark/getbookmarks');
    setMyBookmarks(data);
}

const onUpdateClick = async(id, title) =>{
await axios.post('api/bookmark/update', { id, title });
getBookmarks();
}
const onDeleteClick = async(id) =>{
    await axios.post(`/api/bookmark/delete?id=${id}`);
    getBookmarks();
}
return(
    <>
      <div className='container col-md-8'>
            <h3 className='mt-3'>Welcome back {user.firstName} {user.lastName}</h3>
            <Link to='/addbookmark' className='btn btn-info mb-3'>Add Bookmark</Link>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {myBookmarks && myBookmarks.map(b => <BookmarkRow key={b.id}
                        bookmark={b}
                        onDeleteClick={() => onDeleteClick(b.id)}
                        onUpdateClick={() => onUpdateClick(b.id, b.title)}
                    />)
                    }
                </tbody>
            </table>
        </div>

    
    </>
)
}
export default MyBookmarks;