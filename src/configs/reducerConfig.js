export const isRejectedAction = (action) => {
    return action.type.endsWith('rejected')
}

export const isPendingAction = (action) => {
    return action.type.endsWith('pending')
}
