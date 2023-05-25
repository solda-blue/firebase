import React, { useEffect, useState } from "react";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { db } from "../database/firebase";
import { getAuth } from "firebase/auth";
// eslint-disable-next-line no-unused-vars
import { auth } from "../database/firebase";
import moment from "moment";

const Spend = () => {
    // const token = sessionStorage.getItem("TOKEN");
    const uid = sessionStorage.getItem("UID");
    const [user, setUser] = useState(null);
    const [spendList, setSpendList] = useState([]);
    const [spend, setSpend] = useState({
        category : "clothes",
        detail : "",
        price : 0
    });

    const {category, detail, price} = spend;
    const uQuery = query(collection(db, "spend"), where("username", "==", uid));
    
    useEffect(() => {
        handleAuth();
        getSpend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAuth = async () => {
        let aaa = await getAuth().currentUser;
        setUser(aaa);
        console.log(user);
    }

    const getSpend = async() => {
        const querySnapshot = await getDocs(uQuery);
        let list = [];
        querySnapshot.forEach((doc) => {
            list.push({
                ...doc.data()
            })
        });
        setSpendList(list);
    }

    const handleData = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        // spend[id] = value;
        setSpend({
            ...spend,
            [id] : value
        })
        console.log(spend);
    }

    const addSpend = async () => {
        try {
            const docRef = await addDoc(collection(db, "spend"), {
                username : uid,
                category : spend.category,
                detail : spend.detail,
                price : spend.price,
                regdate : moment().format('YYYY-MM-DD hh:mm:ss')
            });
            alert('등록되었습니다.');
            console.log('Document written with ID: ', docRef);
            getSpend();
            setSpend({
                category : "clothes",
                detail : "",
                price : 0
            })
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div>
            <div>
                <div>
                    <label>카테고리</label>
                    <select id="category" value={category} onChange={handleData}>
                        <option value={"clothes"}>의</option>
                        <option value={"food"}>식</option>
                        <option value={"house"}>주</option>
                        <option value={"etc"}>기타</option>
                    </select>
                </div>
                <div>
                    <label>상세</label>
                    <input id="detail" type="text" value={detail} onChange={handleData} />
                </div>
                <div>
                    <label>금액</label>
                    <input id="price" type="number" value={price} onChange={handleData} />
                </div>
            </div>
            <button onClick={addSpend}>눌러보셈</button>
            <div>
                <h4>지출 항목</h4>
                <table>
                    <thead>
                        <tr>
                            <th>카테고리</th>
                            <th>상세정보</th>
                            <th>금액</th>
                            <th>일시</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            spendList.map((tmp, idx) => 
                                <tr key={idx}>
                                    <td>{tmp.category}</td>
                                    <td>{tmp.detail}</td>
                                    <td>{tmp.price}</td>
                                    <td>{tmp.regdate}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Spend;
