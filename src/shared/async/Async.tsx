import { Suspense } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"

export function Async<Data>({
  useData,
  renderError,
  renderLoading,
  renderSuccess,
}: {
  useData: () => Data
  renderError: (props: FallbackProps) => React.ReactNode
  renderLoading?: () => React.ReactNode
  renderSuccess: (data?: Data) => React.ReactNode
}): React.ReactNode {
  return (
    <ErrorBoundary fallbackRender={renderError}>
      <Suspense fallback={renderLoading ? renderLoading() : renderSuccess()}>
        <AsyncInner useData={useData} renderSuccess={renderSuccess} />
      </Suspense>
    </ErrorBoundary>
  )
}

export function AsyncInner<Data>({
  useData,
  renderSuccess,
}: {
  useData: () => Data
  renderSuccess: (data: Data) => React.ReactNode
}): React.ReactNode {
  const data = useData()

  return renderSuccess(data)
}
