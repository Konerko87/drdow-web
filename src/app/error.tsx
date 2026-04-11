'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-accent mb-4">Oops</h1>
        <p className="text-lg font-semibold text-dark mb-2">發生了一些問題</p>
        <p className="text-muted text-sm mb-8">請重新整理頁面或稍後再試。</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-light transition-colors"
        >
          重新整理
        </button>
      </div>
    </div>
  )
}
