export async function simulateDelay(duration = 700) {
  await new Promise((resolve) => setTimeout(resolve, duration));
}

export async function simulateFailure<T>(
  task: () => Promise<T> | T,
  shouldFail = false,
  message = "Something went wrong. Please try again.",
) {
  await simulateDelay();

  if (shouldFail) {
    throw new Error(message);
  }

  return task();
}
