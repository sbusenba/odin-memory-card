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
    let [playing,setPlaying]= useState(false)
    let [score,setScore]= useState(0)
    let [deck,setDeck] = useState(buildDeck())
    let [greeting,showGreeting] = useState(true)
    let [lost,showLoss]=useState(false)
    let [highScore,setHighScore] = useState(0)
    useEffect(()=>{console.log(score)},[score])
    function hideGreeting(){
        showGreeting(false);
        setPlaying(true)
    }
    function hideLoss (){
        showLoss(false)
        setScore(0);
        setPlaying(true)
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
        setPlaying(false)    
        showLoss(true)

       
    }
    function addPoint(){
        let newScore = score + 1
        console.log('add point')
        shuffleDeck()
        if (newScore > highScore){setHighScore(newScore)}
        setScore(newScore);
    }

    return (
        <div>
            <h3>Is that a...</h3>
        <div className="board">
            {playing? deck.map((card)=>{
                return <MemoryCard 
                    image={card.img} 
                    key ={card.index}
                    clicked= {card.clicked}
                    onClick={addPoint}
                    reset = {resetBoard}
                    />
                }) :null}
            
            {lost?<LossDialog hide={hideLoss}/>:null}
            {greeting?<Greeting hide={hideGreeting}/>:null}
        </div>
            <div class ="scoreboard"
                style ={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-around"
                }}
            >
                <div>score: {score}</div> 
                <div>high: {highScore}</div>

            </div>
        
        </div>
    )
}
export default Board;