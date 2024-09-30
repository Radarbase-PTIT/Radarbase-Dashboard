const app = {
    host: import.meta.env.VITE_VMWARE_API_HOST || "192.168.1.109",
    enableHttps: import.meta.env.VITE_VMWARE_ENABLE_HTTPS,
    hostLocal: {
        name: import.meta.env.VITE_LOCAL_API_HOST || "localhost",
        port: import.meta.env.VITE_LOCAL_API_PORT || "5174",
        enableHttps: import.meta.env.VITE_LOCAL_ENABLE_HTTPS || "http"
    }
}

export default app