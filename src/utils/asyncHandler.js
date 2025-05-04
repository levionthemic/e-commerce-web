export const asyncHandler = async (promise) => {
  try {
    const res = await promise
    if (res?.error) return [null, res.error]
    return [res, null]
  } catch (err) {
    return [null, err]
  }
}
