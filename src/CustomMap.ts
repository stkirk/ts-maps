// Restrict what can be done to the google Map class object so that other developers don't call unvetted methods that would break our application
// By that we mean create a custom map class, exposing only bare bones methods and props that we intend for the application to use
// Hide the existence of the google map from other devs by marking the custom class as private
export class CustomMap {
  // type our google map
  private googleMap: google.maps.Map;
  constructor() {
    //optional argument signified by opts? in hovering over .Map class
    // go to docs with cmd click and find we can pass in an object that looks like MapOptions interface which is defined in the google maps type definition file
    this.googleMap = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }
}
