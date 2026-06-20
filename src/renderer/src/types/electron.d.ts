export {}

declare global {

    interface Window {

        api: {

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