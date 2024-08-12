import { InputAdornment, TextField } from "@mui/material";
import { Header } from "../../components/Header";
import "./index.css";
import { IoIosSearch } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { GetAllTitles, titleResponseType } from "../../controllers/TitlesController";
import { TitleCard } from "../../components/TitleCard";

export function Search(){
    const [titles, setTitles] = useState<titleResponseType[]>([]);
    const [filteredTitles, setFilteredTitles] = useState<titleResponseType[]>([]);

    const [title, setTitle] = useState<titleResponseType>();

    const [isTitleOpen, setIsTitleOpen] = useState<boolean>(false);

    async function fetchTitles(){
        try{
            const data = await GetAllTitles();

            setTitles(data);
        } catch(error){
            throw error;
        }
    }

    function FilterTitles(searchParam: string){
        if(searchParam !== ""){
            let auxTitles = titles.filter((title) => {
                if(title.title.toLowerCase().includes(searchParam)){
                    return true;
                }
                else{
                    return false;
                }
            });
            setFilteredTitles(auxTitles);
        } else{
            setFilteredTitles([]);
        }
    }

    useEffect(() => {
        fetchTitles();
    }, []);

    return(
        <div className="container-geral-search">
            <div className="header-section">
                <Header />
            </div>
            <div className="input-search-container">
                <TextField 
                    id="standard-basic" 
                    className="input-search" 
                    label="Search" 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IoIosSearch className="icon" />
                            </InputAdornment>
                        ),
                    }} 
                    variant="filled" 
                    onChange={(event) => FilterTitles(event.target.value)}
                />
            </div>
            <div className="grid-container">
                <div className="grid-titles">
                    {filteredTitles.map((title) => (
                        <TitleCard key={title.id} title={title} setTitle={setTitle} />
                    ))}
                </div>
            </div>
        </div>
    );
}