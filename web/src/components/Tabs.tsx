import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
        paddingBottom: '0.5rem',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            background: activeTab === tab.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === tab.id ? '2px solid #00F0FF' : '2px solid transparent',
            color: activeTab === tab.id ? '#00F0FF' : '#E5E5E5',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: activeTab === tab.id ? 600 : 400,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.color = '#00F0FF';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.color = '#E5E5E5';
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
