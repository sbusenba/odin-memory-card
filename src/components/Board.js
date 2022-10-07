import { useEffect, useState } from "react";
import MemoryCard from "./MemoryCard";
function importAll(r) {
  
    let images = [];
    r.keys().map((item, index) => { images.push(r(item)); });

    return images;
  }
  
 let images = importAll(require.context('../imgs', false, /\.(png|jpe?g|svg)$/));

function Board(){

    let [score,setScore]= useState(0)
    let [deck,setDeck] = useState(buildDeck())
    
    useEffect(()=>{console.log(score)},[score])

    function buildDeck(){
        let buildingDeck = images.map((img,index)=>{
            return{img,index,clicked : false}
        })
        console.table(buildingDeck)
        return buildingDeck;
        
    }
    function shuffleDeck(){
        let randomIndex = '';
        let shuffledDeck = deck;
        for (let i=(shuffledDeck.length-1);i>=0;i--){
            
            randomIndex = parseInt(Math.random()*(shuffledDeck.length-1));
            
            [shuffledDeck[i],shuffledDeck[randomIndex]]=[shuffledDeck[randomIndex],shuffledDeck[i]]
        }
        console.log('shuffling deck')
        setDeck(shuffledDeck)
    }
    function resetBoard(){
        console.log ('reset board')
        setDeck(buildDeck())
        setScore(0);

        
    }
    function addPoint(){
        setScore(score+1);
        console.log('add point')
        shuffleDeck()
    }

    return (
        <div>
        <div className="board">
            {deck.map((card)=>{
                return <MemoryCard 
                    image={card.img} 
                    key ={card.index}
                    clicked= {card.clicked}
                    onClick={addPoint}
                    reset = {resetBoard}
                    />
                })}
            
        </div>
        <div>score: {score}</div>
        </div>
    )
}
export default Board;