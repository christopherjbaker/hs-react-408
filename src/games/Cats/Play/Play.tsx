import { Async } from "#shared/async"

import { useCat } from "../api"

/** Renders the Play interface. */
const Play: React.FC = () => {
  return (
    <Async
      useData={useCat}
      renderError={({ error, resetErrorBoundary }) => (
        <>
          <button onClick={() => resetErrorBoundary()}>Retry</button>
          <div>{getErrorMessage(error)}</div>
        </>
      )}
      // @ts-expect-error TODO: Fix typescript
      renderSuccess={([cat, { refresh } = {}] = []) => (
        <>
          <div>
            <button disabled={!cat} onClick={() => refresh?.()}>
              Get new Cat!
            </button>
          </div>

          {cat ? (
            <img src={cat.url} width="512" />
          ) : (
            <div
              style={{ width: "512px", height: "512px", background: "gray" }}
            />
          )}
        </>
      )}
    />
  )
}

export default Play

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return `Error: ${error.message}`
  }

  return "Something went wrong."
}
