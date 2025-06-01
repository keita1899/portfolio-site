type DeleteConfirmDialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  portfolioName: string
  isDeleting: boolean
}

export const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  portfolioName,
  isDeleting,
}: DeleteConfirmDialogProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">
          ポートフォリオの削除
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          「{portfolioName}」を削除しようとしています。
          <br />
          <span className="font-semibold text-red-600 dark:text-red-400">
            この操作は取り消すことができません。
          </span>
          <br />
          関連するすべてのデータ（機能、ページ、技術スタック）も同時に削除されます。
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? '削除中...' : '削除する'}
          </button>
        </div>
      </div>
    </div>
  )
}
