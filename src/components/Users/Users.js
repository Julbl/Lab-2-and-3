import { List, Col, Pagination } from 'antd';
import React, {useState, useEffect, useRef} from 'react';

export const useFetchData = (link) => {
    const url = `https://jsonplaceholder.typicode.com/${link}`;
    const cache = useRef({});
    const [text, setText] = useState();
    useEffect(()=>{
        if (cache.current[url]) {
            setText(cache.current[url]);
        }
        else {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setText(res);
                    cache.current[url] = text;
                })
        }
    },[url])
    return text;
}

function UserList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [list, setList] = useState([]);
    var users = useFetchData('users');

    useEffect(() => {
        setList(users);
    }, [users])

    function HandlerUpdatePages (page, pageSize) {
        setCurrentPage(page ? page : 1);
        setPerPage(pageSize);
    }

    if (list != undefined) {
        let firstItem = (currentPage - 1) * perPage;
        let lastItem = currentPage * perPage;
        let pageList = list.slice(firstItem, lastItem);

        return (
        <>
            <Col span={8} style={{margin: '0 auto'}}>
                <h3>User List</h3>
                <List>
                    {pageList.map((item, index)=>{
                        return(          
                            <List.Item key={index} style={{listStyle: 'decimal'}} >
                                <div>
                                <a className href={'todo#'+item.id}><b>{item.username}</b> ({item.name})</a>
                                </div>
                            </List.Item>
                        )
                    })}
                </List>
            </Col>
        </>
        );
    }
    else {
        return(<></>);
    }

}

export default UserList; 