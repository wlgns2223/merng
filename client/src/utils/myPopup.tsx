import { Popup } from "semantic-ui-react";
import React from "react";

interface IPopupProp {
    content: any
    children: any
}

const MyPopup: React.FC<IPopupProp> = ({content, children}) => {
    return <Popup inverted content={content} trigger={children}/>
}

export default MyPopup;