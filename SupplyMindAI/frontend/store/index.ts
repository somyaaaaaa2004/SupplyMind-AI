/**
 * Global store barrel.
 *
 * Add store exports here as slices are implemented.
 * Each domain feature may also have its own local Zustand slice
 * that lives in features/<domain>/store/.
 */

export { useAuthStore } from "./auth.store";

// Future global slices:
// export { useUiStore } from "./ui.store";         // sidebar open/collapsed, modals
// export { useNotificationStore } from "./notification.store";
