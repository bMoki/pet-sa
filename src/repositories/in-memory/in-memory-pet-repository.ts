import { Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FindAllPetFilter, PetCreateInput, PetRepository } from "../pet-repository";
import { InMemoryOrgRepository } from "./in-memory-org-repository";
import { InMemoryAddressRepository } from "./in-memory-address-repository";
import { InMemoryLocationRepository } from "./in-memory-location-repository";


export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = []

  constructor(
    private orgRepository?: InMemoryOrgRepository,
    private addressRepository?: InMemoryAddressRepository,
    private locationRepository?: InMemoryLocationRepository
  ) { }


  async create(data: PetCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      stage: data.stage,
      energy_level: data.energy_level,
      size: data.size,
      environment: data.environment,
      independence_level: data.independence_level,
      org_id: data.org_id,
      photos: data.photos ?? [],
      requirements: data.requirements ?? []
    }
    this.pets.push(pet);
    return pet
  }

  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async deleteById(id: string) {
    const pets = this.pets.filter((item) => item.id !== id)
    this.pets = pets
    return
  }

  async findAll(filter: FindAllPetFilter) {
    const locations = this.locationRepository?.locations
    console.log({ locations })

    const location = this.locationRepository?.locations.filter((item) =>
      (item.localidade === filter.city && item.uf === filter.uf)
    )
    console.log({ location })

    const addresses = this.addressRepository?.addresses.filter((item) =>
      location?.find((location) => location.id === item.location_id)
    )
    console.log({ addresses })

    const orgs = this.orgRepository?.orgs.filter((item) =>
      addresses?.find((address) => address.id === item.address_id)
    )
    console.log({ orgs })

    let pets = this.pets.filter((item) =>
      orgs?.find((org) => org.id === item.org_id)
    )


    pets = pets.filter((pet) => {
      const energy_level = filter.energy_level ? filter.energy_level === pet.energy_level : true
      const stage = filter.stage ? filter.stage === pet.stage : true
      const size = filter.size ? filter.size === pet.size : true
      const independence_level = filter.independence_level ? filter.independence_level === pet.independence_level : true


      if (energy_level && stage && size && independence_level) {
        return pet
      }
    })

    console.log({ pets })
    return pets

  }
}