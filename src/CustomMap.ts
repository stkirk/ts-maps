import { User } from "./User"; // not needed with interface usage for addMarker
import { Company } from "./Company"; // not needed with interface usage for addMarker
// can do two things with a class in TS, create a new instance of that class or use it to annotate a type of object

// Define an interface on how an object can be an argument to the addMarker method on our CustomMap class --> puts the onus on User, Company, Park, CarLot etc to conform to this structure
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

// Restrict what can be done to the google Map class object so that other developers don't call unvetted methods that would break our application
// By that we mean create a custom map class, exposing only bare bones methods and props that we intend for the application to use
// Hide the existence of the google map from other devs by marking the custom class as private
export class CustomMap {
  // type our google map
  private googleMap: google.maps.Map;
  // use param divId to pass in the element we want the map to reference dynamically
  constructor(divId: string) {
    //optional argument signified by opts? in hovering over .Map class
    // go to docs with cmd click and find we can pass in an object that looks like MapOptions interface which is defined in the google maps type definition file
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }

  // These two methods aren't ideal, lots of duplication
  // Instead of doing it this way, we can combine into one method and define an interface that works for a User and Company object
  addUserMarker(user: User): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: user.location.lat,
        lng: user.location.lng,
      },
    });
  }
  addCompanyMarker(company: Company): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: company.location.lat,
        lng: company.location.lng,
      },
    });
  }

  // Single method that accepts a 'mappable' object that is gatekept by our interface to make sure it has all the properties we need to addMarker
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });
    marker.addListener("click", () => {
      //onClick create the infoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      // once it is created, open it
      infoWindow.open(this.googleMap, marker);
    });
  }
}
