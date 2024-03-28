import { CreepRole } from 'utils/definition'; 
import roleHarvester from './role.harvester';
import roleUpgrader from './role.upgrader';

interface RoleLookup {
    [roleName: string]: CreepRole
}

const ROLES: RoleLookup = {
    'harvester': roleHarvester,
    'upgrader': roleUpgrader
};


export function getRole(roleName: string): CreepRole | null{
    return ROLES[roleName] || null
}

export function runCreepRole(creep: Creep) {
    const role = creep.memory.role;
    if (ROLES[role]) {
        ROLES[role].run(creep)
    } else {
        console.log(`No role defined for Creep: ${creep.name}`)
    }
}
