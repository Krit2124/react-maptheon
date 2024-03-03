import React, { useState } from 'react';

import GraphicEditorPage from './graphicEditorPage';
import GraphicEditorHeader from './graphicEditorHeader';

export default function MainGraphicEditor() {
    const [isObjectListVisible, setIsObjectListVisible] = useState(true);

    return (
        <div className="App">
            <GraphicEditorHeader isObjectListVisible={isObjectListVisible} setIsObjectListVisible={setIsObjectListVisible}/>

            <GraphicEditorPage isObjectListVisible={isObjectListVisible}/>
        </div>
    );
}