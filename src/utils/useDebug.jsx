export function useDebug() {
    const isActive = window.location.hash === "#debug";

    return isActive;
}