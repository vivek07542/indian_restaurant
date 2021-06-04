import React,{useState} from 'react';
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import {GoogleMap,withScriptjs,withGoogleMap,Marker} from "react-google-maps";





const Direction = () => {
    const[selectedCity,setSelectedCity] = useState([20.593683,78.962883]);
    
    const Map = () =>{
   
        return (
        <GoogleMap 
        defaultZoom = {5} 
        defaultCenter = {{lat : 20.593683,lng : 78.962883}}     >
            <Marker 
            position = {{lat : +selectedCity[0],lng : +selectedCity[1]}}
             />
        </GoogleMap>    
        );
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));
    
    return (
        <div className = "container-fluid text-center">
            <div className="row ">
                <h1 className="display-4 heading">Locate Store</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                    <select className = "form-control" defaultValue = "" onChange = {(e)=>setSelectedCity([e.target.value])}>
                        <option disabled value="">Find Resturant</option>
                        <option value ={[28.6517178, 77.2219388]}>Delhi</option>
                        <option value ={[ 22.718670, 75.855713]} >Indore</option>
                        <option value ={[ 19.0759899, 72.8773928]} >Mumbai</option>
                        <option value ={[ 13.0836939, 80.270186]} >Chennai</option>
                    </select>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12 " >
                    {/* MAP This Way */}
                    <div style = {{width : "100%",height : "100%"}}>
                    <WrappedMap
                        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBzuhUdIs4qel4nQC903A0o5ME02zEm3kk'}
                        loadingElement = { <div style={{ height: `100%` }} />}
                        containerElement= {<div style={{ height: `400px` }} />} 
                        mapElement= {<div style={{ height: `100%` }}
                         />}
                    />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Direction
