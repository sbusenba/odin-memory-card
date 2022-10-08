function LossDialog(props){
    return (
        <div className='instructions' 
        onClick={props.hide}
        style = {{
            position:'absolute',
            top:"50px",
            left:"50px",
            backgroundColor:"white",
            height:"650px",
            width: "650px",
            justifyContent:"center",  
            display:"flex",
            alignItems:"center", 
            transparency:"0.5",
          }
          }>
            Sorry, you've clicked that before! Try to click each image once, and only once.
          </div>
    )
}
export default LossDialog;