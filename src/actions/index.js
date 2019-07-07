const actionCreateRequest = (type, payload, error, meta) => ({type, payload, error, meta})
const actionCreateSuccess = (type, payload, error, meta) => ({type, payload, error, meta})
const actionCreateFailure = (type, payload, error, meta) => ({type, payload, error, meta})

export {actionCreateRequest,actionCreateSuccess,actionCreateFailure}
