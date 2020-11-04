import React from 'react'

function ThreeDModelPlaceHolder() {
    return (
        <canvas style={{
            border: '1px solid #000000',
            backgroundColor: 'green',
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50% ,-50%)'
        }}>

        </canvas>
    )
}

export default ThreeDModelPlaceHolder
