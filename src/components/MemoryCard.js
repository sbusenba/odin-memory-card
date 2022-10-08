import { useState } from "react";

function MemoryCard(props){
    let [clicked,setClicked]= useState(props.clicked)
    function click(e){
        e.stopPropagation()
        e.preventDefault()
        console.log(clicked)
        if (clicked === false){
            setClicked(true);

            props.onClick()
        } 
        else {
            props.reset()
            setClicked(false);
        }
    }


    return (
        <div className="card">
            <img className="cardImg" 
            alt="a memory card" 
            src={props.image}
            onClick ={click}
            >
            </img>
        </div>
    )
}

export default MemoryCard;