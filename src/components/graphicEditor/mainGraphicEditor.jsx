import React, { useState } from 'react';

import GraphicEditorPage from './graphicEditorPage';
import GraphicEditorHeader from './graphicEditorHeader';

export default function MainGraphicEditor() {
    return (
        <div className="App">
            <GraphicEditorHeader />

            <GraphicEditorPage />
        </div>
    );
}