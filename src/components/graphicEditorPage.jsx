import React from 'react';
import GraphicEditorToolsPanel from './graphicEditorToolsPanel';
import ObjectListOnCanvas from './objectListOnCanvas';

function GraphicEditorPage() {
    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className='size-full-horizontal-percent flex-row-sb-c'>
                <GraphicEditorToolsPanel />

                <ObjectListOnCanvas />
            </div>
        </section>
    );
}

export default GraphicEditorPage;