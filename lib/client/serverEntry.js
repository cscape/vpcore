import { createApp } from './app'

export default context => new Promise((resolve, reject) => {
  const { app, router } = createApp(true /* isServer */)
  const { url } = context
  const { fullPath } = router.resolve(url).route
  const meta = app.$meta()  

  if (fullPath !== url) {
    return reject({ url: fullPath })
  }

  router.push(context.url)
  context.meta = meta
  router.onReady(() => resolve(app))
})
