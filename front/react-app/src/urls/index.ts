export const topPageUrl = '/top'
export const registerUrl = '/auth'
export const loginUrl = '/auth/sign_in'
export const logOutUrl = '/auth/sign_out'
export const sessionsUrl = '/auth/sessions'
export const ProfileUrl = (userId: number): string => `/users/${userId}`
export const EditProfileUrl = (userId: number): string => `/auth/${userId}/edit`
