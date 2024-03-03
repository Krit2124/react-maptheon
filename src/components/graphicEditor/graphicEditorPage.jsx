import React, { useState } from 'react';

import GraphicEditorToolsPanel from './tools/graphicEditorToolsPanel';
import ObjectListOnCanvas from './objectListOnCanvas';
import ToolSettingsPanel from './tools/toolSettingsPanel';

export default function GraphicEditorPage({isObjectListVisible}) {
    const [isToolSettingsPanelVisible, setIsToolSettingsPanelVisible] = useState(false)
    const [currentToolSettingsPanel, setCurrentToolSettingsPanel] = useState(null);

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className='size-full-horizontal-percent flex-row-sb-c'>
                <div className='flex-row-left-c'>
                    <GraphicEditorToolsPanel setCurrentToolSettingsPanel={setCurrentToolSettingsPanel} setIsToolSettingsPanelVisible={setIsToolSettingsPanelVisible}/>
                    {isToolSettingsPanelVisible && <ToolSettingsPanel currentToolSettingsPanel={currentToolSettingsPanel} setIsToolSettingsPanelVisible={setIsToolSettingsPanelVisible}/>}
                </div>

                {isObjectListVisible && <ObjectListOnCanvas />}
            </div>
        </section>
    );
}