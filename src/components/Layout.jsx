import React from 'react'

export default function Layout({children}) {
    return (
        <div style={{width:'100%', height:'100%'}}>
            {children}
        </div>
    )
}