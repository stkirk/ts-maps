// type imports that don't have type files included, tap into a dependency called Deinitely Typed
// @types/{library name}
// npm i @types/faker
import faker from "faker";

//import interface and annotate User class to implement it
// this points us in the right direction upon errors and makes sure User will get through the Mappable gate
import { Mappable } from "./CustomMap";

// User class instances leverage faker to initialize with random class props, i.e. random name, lat and long
// TS convention to use named exports and not default
export class User implements Mappable {
  name: string;
  // this tells TS that we have a location property, it will be an object with lat,lng props BUT it is NOT initialized yet
  // THERE IS NO OBJECT YET and initialization must happen in the constructor
  location: {
    lat: number;
    lng: number;
  };
  color: string = "red";

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      // from the faker definition file, we know lattitude and longitude methods return a string, we want a number so we must use JS to convert to a float
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `
    <div>
        <h1>User Name: ${this.name}</h1>
    </div>
    `;
  }
}
