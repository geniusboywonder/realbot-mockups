import { useState } from 'react';

export const useArtifacts = () => {
  const [activeArtifactTab, setActiveArtifactTab] = useState('requirements');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['source_code', 'documentation']));

  const toggleFolder = (folderName) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  return {
    activeArtifactTab,
    setActiveArtifactTab,
    expandedFolders,
    toggleFolder,
  };
};
