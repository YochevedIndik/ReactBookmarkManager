import axios from "axios";
import React, {useState} from "react";
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../AuthContext";

const AddBookmark =() =>{
    const [bookmark, setBookmark] = useState({title:'', url:''});
const history = useHistory();
const {user} = useAuthContext();
    const onTextChange = e => {
        setBookmark({
            ...bookmark,
            [e.target.name]: e.target.value
        });
    }
    
    const {title, url, userId} = bookmark;
        const onAddClick = async() =>{
            await axios.post('/api/bookmark/addbookmark', {title, url, userId: user.id})
            history.push('/mybookmarks');
        }
      return(
          <>
            <div className="row" style={{ marginTop: 20 }}>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Add Bookmark</h4>
                        
                            <input type="text" onChange={onTextChange} name="title" placeholder="Title" className="form-control" />
                            <br />
                            <input type="text" onChange={onTextChange} name="url" placeholder="Url" className="form-control" />
                           <br />
                            <button className="btn btn-primary" onClick={onAddClick}>Add</button>
                        
                    </div>
                </div>
            </div>
          </>
      )
}
export default AddBookmark;