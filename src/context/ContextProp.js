import React, { createContext } from 'react';
import { useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_GRAPHQL_QUERY } from '../util/graphql';


const contextProp = createContext();

const ContextPropProvieder = ({children}) => {
    const {loading, error, data : {getMarkers, getUsers} = {}} = useQuery(FETCH_GRAPHQL_QUERY); // DATA LOAD
    const [categorySelect, setCategorySelect] = useState(["restaurant", "cafe", "photo", "travel"]);
    const [userSelect, setUserSelect] = useState([]);
    const [placeName, setPlaceName] = useState("");
    const [zoomLevel, setZoomLevel] = useState("8");
    const [selectLat, setSelectLat] = useState("37.54802");
    const [selectLng, setSelectLng] = useState("126.985835");

    return (
        <contextProp.Provider value={{categorySelect, setCategorySelect, userSelect, setUserSelect, loading, error, getMarkers, getUsers, placeName, setPlaceName, zoomLevel, setZoomLevel, selectLat, setSelectLat, selectLng, setSelectLng}}>
            {children}
        </contextProp.Provider>
    );


}

export { contextProp, ContextPropProvieder };