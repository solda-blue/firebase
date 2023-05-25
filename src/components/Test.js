import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../database/firebase";

const Test = () => {
    const [userid, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const querySnapshot = await getDocs(collection(db, "user"));
        let list = []
        querySnapshot.forEach((doc) => {
            // console.log(doc.id ,doc.data());
            list.push({
                _id : doc.id,
                ...doc.data()
            });
        })
        console.log(list);
        setUsers(list);
    }

    const handleUserId = (e) => {
        let str = e.target.value;
        setUserId(str);
    }
    const handleUserName = (e) => {
        let str = e.target.value;
        setUsername(str);
    }

    const AddUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "user"), {
                id : userid,
                name : username
            });
            console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
    const deleteUser = async (_id) => {
        await deleteDoc(doc(db, "user", _id));
    }

    return (
        <div>
            <h3>Test Page</h3>
            <div>
                <input type="text" onChange={handleUserId} placeholder="아이디 입력하셈" />
                <br />
                <input type="text" onChange={handleUserName} placeholder="이름 입력하셈" />
                <br />
                <button onClick={AddUser}>클릭하셈</button>
            </div>
            <hr />
            <div>
                {users.map((tmp, idx) => 
                    <div style={{background : "#be123c", padding : "5px", width : "300px", borderRadius : "5px"}} key={idx}>
                        doc : <span>{tmp._id}</span> <br />
                        ID : <span>{tmp.id}</span> <br />
                        NAME : <span>{tmp.name}</span> <br />
                        <button onClick={() => {deleteUser(tmp._id)}}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Test;