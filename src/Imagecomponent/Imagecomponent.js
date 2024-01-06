import './Imagecomponent.css'

const Image=(props)=>{
   return <>
    <div className="singleImgContainer">
        <img src={props.data.urls.full} alt="" />
        <div className="screen"></div>
        <div className="text">{props.data.alt_description}</div>
    </div>
    </>
}

export default Image;