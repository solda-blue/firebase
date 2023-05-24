import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebase";

const Test = () => {
    const [userid, setUserId] = useState("");

    const handleUserId = (e) => {
        let str = e.target.value;
        setUserId(str);
    }

    const AddUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "user"), {
                id : userid,
                password : 'pass02'
            });
            console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return (
        <div>
            <h3>Test Page</h3>
            <input type="text" onChange={handleUserId} placeholder="아이디 입력하셈" />
            <button onClick={AddUser}>클릭하셈</button>
        </div>
    )
};

export default Test;