type StatCardProps = {
  title: string
  value: number
  icon: React.ReactNode
  colorClass: string
  onClick?: () => void
}

export const StatCard = ({
  title,
  value,
  icon,
  colorClass,
  onClick,
}: StatCardProps) => {
  return (
    <div
      className={`${colorClass} rounded-xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">{icon}</div>
          <div>
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        </div>

        {/* 装飾的な要素 - 小さく右端に */}
        <div className="opacity-10">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <div className="text-sm">{icon}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
