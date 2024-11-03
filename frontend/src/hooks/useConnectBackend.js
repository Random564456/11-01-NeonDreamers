import React, { useEffect, useState } from 'react'
import useRetrieveData from './useRetrieveData';

export default function useConnectBackend(setConnectionEstablished) {

    useEffect(() => {

        fetch("http://127.0.0.1:8000/connection")
        .then(response => response.json())
        .then(response => {
            console.log(response.connection);
            setConnectionEstablished(true);
        })
        .catch(error => console.error('Error:', error))

    }, [])

}
