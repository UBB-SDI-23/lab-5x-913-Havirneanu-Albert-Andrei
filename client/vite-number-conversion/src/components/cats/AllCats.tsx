import React from "react";
import { DEV_BACKEND_URL } from "../../constants";
import { useEffect, useState } from "react";
import { Cat } from "../../models/cat";

export default function AllCats() {
    const [cats, setCats] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${DEV_BACKEND_URL}/cats`);
                const data = await response.json();
                setCats(data);
            } catch(error: any){
                setError(error.message);
            }
        }
        getData();
    }, [])
    

    if (error) {
        return (
            <>
                <h1>Error while fetching :(</h1>
                <p>Error message: {error}</p>
            </>
        )
    }
    return(
        <div>
            <h1>List of Cats</h1>
            <table>
                <tbody>
                <tr>
                    <th>#</th>
                    <th>CatName</th>
                    <th>CatBreed</th>
                    <th>Color</th>
                    <th>Vaccinated</th>
                    <th>YearBirth</th>
                </tr>
                {cats.map((cat: Cat, index) => 
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{cat.name}</td>
                        <td>{cat.breed}</td>
                        <td>{cat.color}</td>
                        <td>{cat.vaccinated}</td>
                        <td>{cat.yearBirth}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}