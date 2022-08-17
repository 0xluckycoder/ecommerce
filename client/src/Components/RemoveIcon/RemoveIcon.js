import React from "react";
import Remove from '../../assets/remove-icon.svg';

export default function RemoveIcon({ left, top, imageFieldName, state, setState }) {
    const removeImage = (imageFieldName) => {
        setState({...state, [imageFieldName]: ""});
    }
    return <img src={Remove} onClick={() => removeImage(imageFieldName)} className="remove-icon" style={{left, top}} />
}