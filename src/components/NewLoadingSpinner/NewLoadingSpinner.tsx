// import icon da un npm package ? COME SCARICARE NPM ICONS TYPESCRIPT REACT 
//import { useEffect, useState } from "react"


    interface propsloadingspinner{
        color?: string; 
        size?:"small" | "medium" | "large", 
    }
export default function NewLoadingSpinner({color ="red", size="large"}: propsloadingspinner ){

    return (
        <>
     
        <div className={`loadingspinner loading-spinner--${size}`} style={{borderTopColor: color}}/>
        </>
    )

}