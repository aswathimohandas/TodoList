import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { getTodos } from './allApis.js/allApi';
import Add from './Add';
import { delTodos } from './allApis.js/allApi';
import { getUser } from './allApis.js/allApi';
import { toast } from 'react-toastify';
import Edit from './Edit';

function Home() {
    const [todo, setTodo] = useState([]);

    
    useEffect(() => {
        getData();
        getNewTodos()
    }, []);

    
    const getData = async () => {
        try {
            const response = await getTodos();
            console.log(response);
            
            setTodo(response.data); 
            
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const getNewTodos = async () => {
        const result = await getUser()
        console.log(result);
        if (result.status == 200) {
          setTodo(result.data)
    
        }
      }

      const handleDelete = async (id) => {
        console.log("Attempting to delete ID:", id);
    
        try {
            const result = await delTodos(id);
            console.log("Delete result:", result);
    
            if (result.status === 200) {
                getData(); // Refresh data
                toast.success("Todo Removed!!");
            } else {
                toast.error("Failed to delete Todo");
            }
        } catch (error) {
            console.error("Error during delete operation:", error);
            toast.error("An error occurred while deleting the Todo");
        }
    };

    return (
        <>
            <div className="border m-3 shadow">
                <Row>
                    <Col md={1} sm={12}>
                        <Add/>
                    </Col>
                    <Col md={11} sm={12}>
                    <h1>Todo List</h1>
                        <table className='table table-dark'>
                            
                                <thead>
                                    <tr>
                                    <th>userid</th>
                                    <th>id</th>
                                    <th>title</th>
                                    <th>completed</th>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                   
                                </thead>
                        
                            <tbody>
                                {
                                    todo.map(item=>(
                                        <tr>
                                    <td>{item.userId}</td>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.completed}</td>
                                    <td><Edit editTodo={item}/></td>
                                    <td><button className='btn' onClick={() => { handleDelete(item.id) }}><i className="fa-solid fa-trash" /></button></td>
                                </tr>

                                    ))
                                }
                                
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Home;
