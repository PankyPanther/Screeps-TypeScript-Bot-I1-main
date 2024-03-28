import { CreepRole } from "utils/definition"
import { runStates } from "managers/state_manager"
import { harvest } from "creeps/actions/action.harvest"
import { assignSource } from "utils/assignSource"
import { store } from "creeps/actions/action.store";

// roleHarvester: CreepRole
const roleHarvester: CreepRole = {
    getRoleName() { return 'harvester'; },

    getBody(energyCapacity) {
        return [
            MOVE, MOVE,
            WORK, CARRY
        ]
    },

    run: function(creep) {
        // Define your states as functions
        const data = {
            sourceID: ''
        };

        const states = {
                HARVESTING: (data: any, creep: Creep) => {
                    creep.say('harvesting')

                    if (!data.sourceID){
                        data.sourceID = assignSource(creep)
                    }

                    if (creep.store.getFreeCapacity() == 0) { return "STORING" }

                    harvest(creep, {
                        sourceID: data.sourceID
                    }) 

                    return 'HARVESTING';
                    
                    
                },
            
                STORING: (data: any, creep: Creep) => {
                    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) { return "HARVESTING" }

                    creep.say('store')
                    store(creep)
                    
                    return "STORING"
                },
        
        };
    
        runStates(states, data, creep);
    }
};


export default roleHarvester