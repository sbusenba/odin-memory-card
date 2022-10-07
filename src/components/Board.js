import { useEffect, useState } from "react";
import MemoryCard from "./MemoryCard";
import Greeting from "./Greeting"
import LossDialog from "./LossDialog";
import "../styles/board.css"
function importAll(r) {
  
    let images = [];
    r.keys().map((item, index) => { images.push(r(item)); });

    return images;
  }
  
 let images = importAll(require.context('../imgs', false, /\.(png|jpe?g|svg)$/));

function Board(){

    let [score,setScore]= useState(0)
    let [deck,setDeck] = useState(buildDeck())
    let [greeting,showGreeting] = useState(true)
    let [lost,showLoss]=useState(false)
    useEffect(()=>{console.log(score)},[score])
    function hideGreeting(){
        showGreeting(false);
    }
    function hideLoss (){
        showLoss(false)
        setScore(0);
    }
    function buildDeck(){
        let buildingDeck = images.map((img,index)=>{
            return{img,index,clicked : false}
        })
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
            
        showLoss(true)

       
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
            {lost?<LossDialog hide={hideLoss}/>:null}
            {greeting?<Greeting hide={hideGreeting}/>:null}
        </div>
      
        <div>score: {score}</div>
        </div>
    )
}
export default Board;