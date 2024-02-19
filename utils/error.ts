export const getErrorMessage = (error: any): { error: string; message: string } => {
  if (error.name === 'MongoServerError') {
    switch (error.code) {
      case 11000:
        return { error: 'MongoServerError', message: `${Object.keys(error.keyValue)} already exists!` }
      default:
        return error.message
    }
  }
  if (error instanceof Error) return { error: 'Error', message: error.message }

  return { error: 'Unknown', message: String(error) }
}
