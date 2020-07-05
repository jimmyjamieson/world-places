const handleApiError = (error) => {
  const { response = {}} = error
  const { data = {}} = response
  return data
}

export default handleApiError