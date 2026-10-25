function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert">
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}

export default ErrorMessage