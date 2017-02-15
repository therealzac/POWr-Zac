const logger = store => next => action => {
  console.log('Dispatching...', action)
  let result = next(action)
  console.log('State:', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Aw snap!', err)
    throw err
  }
}

module.exports = { logger, crashReporter }
