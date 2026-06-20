import { eventBus }
from "./eventBus"

import { stateManager }
from "./stateManager"

eventBus.on(
    "state-updated",
    state => {

        console.log(
            "STATE UPDATED"
        )

        console.log(state)
    }
)

stateManager.updateWorker1({
    running: true
})

stateManager.setQueue([
    "ORD-001",
    "ORD-002"
])

