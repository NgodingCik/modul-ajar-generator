export function registerRoute (routes, route) {
  switch (route.method.toLowerCase()) {
    case 'get':
      routes.get(route.path, route.handler)
      break
    case 'post':
      routes.post(route.path, route.handler)
      break
    case 'put':
      routes.put(route.path, route.handler)
      break
    case 'delete':
      routes.delete(route.path, route.handler)
      break
    case 'patch':
      routes.patch(route.path, route.handler)
      break
    default:
      throw new Error(`Unsupported HTTP method: ${route.method}`)
  }
}
