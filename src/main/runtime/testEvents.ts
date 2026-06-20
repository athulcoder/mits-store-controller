import { eventBus } from "./eventBus"
import { EVENTS } from "./events"

eventBus.on(
    EVENTS.ORDER_ENQUEUED,
    orderId => {

        console.log(
            "NEW ORDER",
            orderId
        )
    }
)

eventBus.on(
    EVENTS.PRINT_STARTED,
    orderId => {

        console.log(
            "PRINT STARTED",
            orderId
        )
    }
)

eventBus.on(
    EVENTS.PRINT_COMPLETED,
    orderId => {

        console.log(
            "PRINT COMPLETED",
            orderId
        )
    }
)