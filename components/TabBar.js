import classNames from "classnames";

export const TabBar = ({ tabs, activeTab, onTabSelect }) => {
  return (
    <div className="flex bg-black">
      <div className="flex-1">
        {tabs.map(tab => (
          <button
            key={tab.value}
            className={classNames(
              tab.value === activeTab
                ? 'bg-[#1E1E1E] text-gray-200'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800 active:bg-gray-800',
              'px-4 py-0.5 font-medium text-sm focus:outline-none transition'
            )}
            onClick={() => onTabSelect(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}