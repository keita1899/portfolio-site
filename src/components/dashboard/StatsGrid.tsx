import { StatCard } from './StatCard'
import { FolderIcon, CheckCircleIcon, EyeOffIcon } from './icons'

export type FilterType = 'all' | 'published' | 'unpublished'

type StatsGridProps = {
  totalCount: number
  publishedCount: number
  unpublishedCount: number
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export const StatsGrid = ({
  totalCount,
  publishedCount,
  unpublishedCount,
  currentFilter,
  onFilterChange,
}: StatsGridProps) => {
  const stats = [
    {
      title: '総ポートフォリオ数',
      value: totalCount,
      icon: <FolderIcon />,
      colorClass:
        currentFilter === 'all'
          ? 'bg-gradient-to-br from-blue-600 to-blue-700 ring-2 ring-blue-300'
          : 'bg-gradient-to-br from-blue-500 to-blue-600',
      filter: 'all' as FilterType,
    },
    {
      title: '公開中',
      value: publishedCount,
      icon: <CheckCircleIcon />,
      colorClass:
        currentFilter === 'published'
          ? 'bg-gradient-to-br from-green-600 to-green-700 ring-2 ring-green-300'
          : 'bg-gradient-to-br from-green-500 to-green-600',
      filter: 'published' as FilterType,
    },
    {
      title: '非公開',
      value: unpublishedCount,
      icon: <EyeOffIcon />,
      colorClass:
        currentFilter === 'unpublished'
          ? 'bg-gradient-to-br from-orange-600 to-orange-700 ring-2 ring-orange-300'
          : 'bg-gradient-to-br from-orange-500 to-orange-600',
      filter: 'unpublished' as FilterType,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          colorClass={stat.colorClass}
          onClick={() => onFilterChange(stat.filter)}
        />
      ))}
    </div>
  )
}
