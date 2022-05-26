import React, {useState} from "react";

const BookmarkRow = ({ bookmark, onDeleteClick, onUpdateClick}) =>{
const {id, title, url} = bookmark;
    const [isEditing, setIsEditing] = useState(false);
// const title = bookmark.title;
    const onTextChange = e =>{
        bookmark.title = e.target.value;
  }
  const onUpdateClicked =() =>{
      onUpdateClick(id, title);
      setIsEditing(false);
  }
    const onCancelClick = () =>{
      setIsEditing(false);
      
  }

    return(
        <>
        
        <tr>
            <td>{isEditing ? <input className="form-control" type='text' defaultValue={title} onChange={onTextChange} /> : title}</td>
            <td><a href={url}target="_blank">{url}</a></td>
        <td>
                    {!isEditing && <button className="btn btn-success mr-3" onClick={() => setIsEditing(true)}>Edit Title</button>}
                    {isEditing && <button className="btn btn-warning mr-3"  onClick={onUpdateClicked}>Update</button>}
{isEditing && <button className='btn btn-info mr-3' onClick={onCancelClick}>Cancel</button>}
                    <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
        </td>
        </tr>
        </>
    )
}
export default BookmarkRow;