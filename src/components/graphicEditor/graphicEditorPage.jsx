import React, { useState } from 'react';
import { fabric } from 'fabric-all-modules';

import GraphicEditorToolsPanel from './tools/graphicEditorToolsPanel';
import ObjectListOnCanvas from './objectListOnCanvas';
import ToolSettingsPanel from './tools/toolSettingsPanel';
import CanvasComponent from './canvasComponent';
import { useGeneralGraphicEditorStore } from 'store/store';

export default function GraphicEditorPage() {
    const { isToolSettingsPanelVisible, isObjectListVisible } = useGeneralGraphicEditorStore();

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className='size-full-horizontal-percent flex-row-sb-c'>
                <div className='flex-row-left-c'>
                    <GraphicEditorToolsPanel/>

                    {isToolSettingsPanelVisible && <ToolSettingsPanel/>}
                </div>

                <CanvasComponent/>

                {isObjectListVisible && <ObjectListOnCanvas/>}
            </div>
        </section>
    );
}