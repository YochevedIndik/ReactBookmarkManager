import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [topBookmarks, setTopBookmarks] = useState();

    useEffect(() =>{
        const getTopBookmarks = async() =>{
            const {data} = await axios.get('/api/bookmark/gettopbookmarks');
            setTopBookmarks(data);
        }
        getTopBookmarks();
    }, []);
    return (
        <>
        <div className="container col-md-8">
        <h1>Welcome to the React Bookmark Application.</h1>
                <h3>Top 5 most bookmarked links</h3>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topBookmarks && topBookmarks.map(b => <tr key={b.url}>
                            <td>
                                <a href={b.url} target="_blank">{b.url}</a>
                            </td>
                            <td>
                                {b.count}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
        </div>
        </>
    )
}
export default Home;