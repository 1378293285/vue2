// 将token进行本地存储
// 2. localStorage

const TOKEN_KEY = 'token'
// 设置值
export const setUser = data => {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
}

// 取出值
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(TOKEN_KEY))
}

// 移除值
export const removeUser = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}
