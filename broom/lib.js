export function createdError () {
  const a = {}
  a.b()
}

export async function createdAsyncError () {
  try {
    await axios.get('https://api.douban.com/v2/movie/top250')
  } catch (error) {
    TraceKit.report(error)
  }
}
