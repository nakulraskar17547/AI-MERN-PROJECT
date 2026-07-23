import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function Livesite() {
  const { id } = useParams();
  const [html,setHtml]=useState("")
  const [error,setError]=useState("")
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/website/get-by-id/${id}`,
          { withCredentials: true })
          setHtml(result.data.latestCode)
        
      } catch (error) {
        console.log(error);
        setError("Site not found")
        
      }
    };
    handleGetWebsite();
  }, [id])
  if(error){
    return(
        <div className="h-screen flex items-center justify-center bg-black text-white">
            {error}
        </div>
    )
  }
  return (
    <iframe title="Live Site" srcDoc={html} className="w-screen h-screen
    border-none" sandbox="allow-scripts allow-same-origin allo-forms"/>
  )
}

export default Livesite;
