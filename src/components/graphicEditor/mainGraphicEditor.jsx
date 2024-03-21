import React, { useState } from 'react';

import GraphicEditorPage from './graphicEditorPage';
import GraphicEditorHeader from './graphicEditorHeader';

export default function MainGraphicEditor() {
    const [isObjectListVisible, setIsObjectListVisible] = useState(true);

    const [isUndoRequired, setIsUndoRequired] = useState(false)
    const [isRedoRequired, setIsRedoRequired] = useState(false)

    return (
        <div className="App">
            <GraphicEditorHeader 
                isObjectListVisible={isObjectListVisible}
                setIsObjectListVisible={setIsObjectListVisible}
                setIsUndoRequired={setIsUndoRequired}
                setIsRedoRequired={setIsRedoRequired}
            />

            <GraphicEditorPage 
                isObjectListVisible={isObjectListVisible}
                isUndoRequired={isUndoRequired}
                setIsUndoRequired={setIsUndoRequired}
                isRedoRequired={isRedoRequired}
                setIsRedoRequired={setIsRedoRequired}
            />
        </div>
    );
}