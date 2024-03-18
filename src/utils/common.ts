export const isMobile = () => {
    const regex = /android|iphone|kindle|ipad/i;
    return regex.test(navigator.userAgent);
}