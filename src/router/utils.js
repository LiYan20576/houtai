/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
//  && localStorage.getItem('accessToken')
export const isUserLoggedIn = () => !!(localStorage.getItem('userStatus') == 200 && localStorage.getItem('userData') )
