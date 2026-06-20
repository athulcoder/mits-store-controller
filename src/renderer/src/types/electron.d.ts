export {}

declare global {

    interface Window {

        api: {
            manualPrint(
                orderId:string
                ):Promise<void>

            getState():
            Promise<any>

            setMode(
                mode:string
            ):Promise<void>

            onStateUpdated(
                callback:
                (state:any)=>void
            ):void
        }
    }
}